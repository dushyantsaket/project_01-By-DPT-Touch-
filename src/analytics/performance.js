/**
 * performance.js — Web Vitals monitoring
 * Observes LCP, FID, CLS, TTFB, DOM Ready, Page Load
 * with auto-cleanup and integration with CSM batcher
 */
import { csm } from './csm.js';

let lcpObserver = null;
let fidObserver = null;
let clsObserver = null;
let clsValue = 0;

// ─── LCP ──────────────────────────────────────────────────────────────────────
export function observeLCP() {
  try {
    if (typeof PerformanceObserver === 'undefined') return;
    lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        const value = Math.round(last.startTime);
        csm.count('lcp', value);
        csm.uet('ld', 'lcp', {}, performance.now());
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Auto-cleanup after 30s
    setTimeout(() => {
      lcpObserver?.disconnect();
      lcpObserver = null;
    }, 30000);
  } catch (e) {
    console.error('LCP observation failed:', e);
  }
}

// ─── FID ──────────────────────────────────────────────────────────────────────
export function observeFID() {
  try {
    if (typeof PerformanceObserver === 'undefined') return;
    fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const delay = Math.round(entry.processingStart - entry.startTime);
        csm.count('fid', delay);
        // Disconnect after first input
        fidObserver?.disconnect();
        fidObserver = null;
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.error('FID observation failed:', e);
  }
}

// ─── CLS ──────────────────────────────────────────────────────────────────────
export function observeCLS() {
  try {
    if (typeof PerformanceObserver === 'undefined') return;
    clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          csm.count('cls', Math.round(clsValue * 1000));
        }
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    window.addEventListener('beforeunload', () => {
      csm.count('cls_final', Math.round(clsValue * 1000));
    });
  } catch (e) {
    console.error('CLS observation failed:', e);
  }
}

// ─── TTFB ─────────────────────────────────────────────────────────────────────
export function measureTTFB() {
  try {
    const timing = performance?.timing;
    if (!timing) return;
    const ttfb = timing.responseStart - timing.requestStart;
    csm.count('ttfb', ttfb);
  } catch (e) {
    console.error('TTFB measurement failed:', e);
  }
}

// ─── DOM Ready ────────────────────────────────────────────────────────────────
export function measureDOMReady() {
  try {
    const timing = performance?.timing;
    if (!timing) return;
    const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
    csm.count('dom_ready', domReady);
  } catch (e) {
    console.error('DOM ready measurement failed:', e);
  }
}

// ─── Page Load ────────────────────────────────────────────────────────────────
export function measurePageLoad() {
  try {
    const timing = performance?.timing;
    if (!timing) return;
    const load = timing.loadEventEnd - timing.navigationStart;
    csm.count('page_load', load);
  } catch (e) {
    console.error('Page load measurement failed:', e);
  }
}

// ─── Cleanup ──────────────────────────────────────────────────────────────────
export function cleanupPerformanceObservers() {
  lcpObserver?.disconnect();
  fidObserver?.disconnect();
  clsObserver?.disconnect();
  lcpObserver = fidObserver = clsObserver = null;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
export function initPerformanceMonitoring() {
  measureTTFB();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      measureDOMReady();
      observeLCP();
      observeFID();
      observeCLS();
    });
  } else {
    measureDOMReady();
    observeLCP();
    observeFID();
    observeCLS();
  }

  window.addEventListener('load', measurePageLoad);
  window.cleanupPerformanceObservers = cleanupPerformanceObservers;
}
