/**
 * mutationObserver.js — Safe debounced MutationObserver
 * Detects dynamically loaded widgets with error isolation
 */

export class SafeMutationObserver {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.options = {
      childList: true,
      subtree: true,
      attributes: false,
      ...options,
    };
    this.observer = null;
    this.debounceTimer = null;
    this.debounceDelay = options.debounceDelay || 150;
    this.pendingMutations = [];
    this.isObserving = false;
  }

  start() {
    if (this.observer) return;
    try {
      this.observer = new MutationObserver((mutations) => {
        this._handleMutations(mutations);
      });
      this.observer.observe(document.body, this.options);
      this.isObserving = true;
    } catch (error) {
      console.error('MutationObserver start failed:', error);
    }
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
      this.isObserving = false;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.pendingMutations = [];
  }

  _handleMutations(mutations) {
    try {
      this.pendingMutations.push(...mutations);
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        const batch = this.pendingMutations.splice(0);
        try {
          this.callback(batch);
        } catch (error) {
          console.error('MutationObserver callback failed:', error);
          if (window.ueLogError) {
            window.ueLogError(error, { attribution: 'SafeMutationObserver' });
          }
        }
      }, this.debounceDelay);
    } catch (error) {
      console.error('MutationObserver handle failed:', error);
    }
  }

  // Static helper: observe for dynamically added widget elements
  static observeWidgets(widgetSelector, callback) {
    const observer = new SafeMutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return; // Element nodes only
          const matches = node.matches && node.matches(widgetSelector)
            ? [node]
            : node.querySelectorAll
            ? Array.from(node.querySelectorAll(widgetSelector))
            : [];
          matches.forEach((widget) => {
            try {
              callback(widget);
            } catch (e) {
              console.error('Widget callback failed:', e);
            }
          });
        });
      });
    });
    observer.start();
    return observer;
  }
}

// Expose globally for inline scripts
if (typeof window !== 'undefined') {
  window.SafeMutationObserver = SafeMutationObserver;
}
