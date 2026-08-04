/**
 * index.js — Unified analytics entry point
 * Wires together CSM, CSA, Performance, ErrorBoundary, Cart
 */
import { csm } from './csm.js';
import { csa } from './csa.js';
import { initPerformanceMonitoring, cleanupPerformanceObservers } from './performance.js';
import { SafeMutationObserver } from './mutationObserver.js';
import { addToCart, updateCartQuantity, removeFromCart, applyPromoCode, replayOfflineQueue } from './cart.js';
import { ErrorBoundary, logError } from './errorBoundary.jsx';

// Boot performance monitoring immediately
initPerformanceMonitoring();

// Auto-replay offline cart actions if online
if (navigator.onLine) replayOfflineQueue();

export const analytics = {
  csm,
  csa,
  cart: { addToCart, updateCartQuantity, removeFromCart, applyPromoCode },
  observer: SafeMutationObserver,
  error: logError,
  cleanup: cleanupPerformanceObservers,
};

export { ErrorBoundary, logError, csm, csa, SafeMutationObserver };
export { addToCart, updateCartQuantity, removeFromCart, applyPromoCode };
