/**
 * cart.js — Resilient cart helper
 * addToCart with optimistic UI, retries, rollback, offline queue
 */
const OFFLINE_QUEUE_KEY = 'cart_offline_queue';
const BACKEND = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function getOfflineQueue() {
  try { return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]'); } catch (_) { return []; }
}
function saveOfflineQueue(queue) {
  try { localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue)); } catch (_) {}
}
function enqueueOffline(action) {
  const q = getOfflineQueue();
  q.push({ ...action, timestamp: Date.now() });
  saveOfflineQueue(q);
}

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i))); // 1s, 2s, 4s
    }
  }
}

// ─── Add to Cart ──────────────────────────────────────────────────────────────
export async function addToCart(productId, quantity, options = {}) {
  const { onOptimisticUpdate, onRollback, onSuccess, onError, cartId } = options;

  // Optimistic UI update BEFORE server confirms
  if (onOptimisticUpdate) onOptimisticUpdate({ productId, quantity });

  if (!navigator.onLine) {
    enqueueOffline({ action: 'add', productId, quantity, cartId });
    if (onSuccess) onSuccess({ offline: true });
    return { offline: true };
  }

  try {
    const data = await fetchWithRetry(`${BACKEND}/cart/add-to-cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ productId, quantity, cartId }),
    });
    if (onSuccess) onSuccess(data);
    return data;
  } catch (err) {
    // Rollback optimistic update
    if (onRollback) onRollback();
    if (onError) onError(err);
    throw new Error('Failed to add item to cart. Please try again.');
  }
}

// ─── Update Quantity ──────────────────────────────────────────────────────────
export async function updateCartQuantity(cartId, itemId, quantity) {
  try {
    return await fetchWithRetry(`${BACKEND}/cart/update-quantity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ cartId, itemId, quantity }),
    });
  } catch (err) {
    throw new Error('Failed to update quantity. Please try again.');
  }
}

// ─── Remove Item ──────────────────────────────────────────────────────────────
export async function removeFromCart(cartId, itemId) {
  try {
    return await fetchWithRetry(`${BACKEND}/cart/remove-item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ cartId, itemId }),
    });
  } catch (err) {
    throw new Error('Failed to remove item. Please try again.');
  }
}

// ─── Apply Promo Code ─────────────────────────────────────────────────────────
export async function applyPromoCode(cartId, promoCode) {
  try {
    return await fetchWithRetry(`${BACKEND}/cart/apply-promo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ cartId, promoCode }),
    });
  } catch (err) {
    throw new Error('Invalid or expired promo code.');
  }
}

// ─── Replay Offline Queue ─────────────────────────────────────────────────────
export async function replayOfflineQueue() {
  const queue = getOfflineQueue();
  if (!queue.length) return;
  const remaining = [];
  for (const item of queue) {
    try {
      if (item.action === 'add') {
        await addToCart(item.productId, item.quantity, { cartId: item.cartId });
      }
    } catch (_) {
      remaining.push(item);
    }
  }
  saveOfflineQueue(remaining);
}

// Auto-replay when connection restores
if (typeof window !== 'undefined') {
  window.addEventListener('online', replayOfflineQueue);
}
