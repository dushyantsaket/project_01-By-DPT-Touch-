/**
 * csa.js — Client-Side Analytics Plugin System
 * Provides csa(serviceName, config) factory and plugin registration
 */
import { defaultBatcher } from './batcher.js';

const services = {};

class CsaService {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this._listeners = {};
    this._buffer = [];
    this._marks = {};
  }

  log(eventType, data, options = {}) {
    try {
      const event = {
        service: this.name,
        type: eventType,
        data: this._sanitize(data),
        timestamp: Date.now(),
        options,
      };
      this._buffer.push(event);
      this._trigger(eventType, event);
      defaultBatcher.enqueue({ type: 'csa_log', name: eventType, data: event });
      return event;
    } catch (e) {
      console.error('CSA log failed:', e);
      return null;
    }
  }

  mark(name, timestamp, data) {
    try {
      const m = { name, timestamp: timestamp || Date.now(), data: data || {} };
      this._marks[name] = m;
      defaultBatcher.enqueue({ type: 'csa_mark', name, data: m });
      return m;
    } catch (e) {
      console.error('CSA mark failed:', e);
      return null;
    }
  }

  on(event, callback, options = {}) {
    if (!this._listeners[event]) this._listeners[event] = [];
    const entry = { callback, once: !!options.once };
    this._listeners[event].push(entry);
    return () => this.off(event, callback);
  }

  once(event, callback) {
    return this.on(event, callback, { once: true });
  }

  off(event, callback) {
    if (!this._listeners[event]) return;
    this._listeners[event] = callback
      ? this._listeners[event].filter((l) => l.callback !== callback)
      : [];
  }

  emit(event, data) {
    this._trigger(event, data);
  }

  _trigger(event, data) {
    (this._listeners[event] || []).forEach((l) => {
      try {
        l.callback(data);
        if (l.once) this.off(event, l.callback);
      } catch (e) {
        console.error(`CSA listener error [${event}]:`, e);
      }
    });
  }

  _sanitize(data) {
    if (!data) return {};
    try {
      const copy = JSON.parse(JSON.stringify(data));
      const SENSITIVE = ['password', 'token', 'secret', 'key', 'cvv', 'cardnumber'];
      const clean = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        Object.keys(obj).forEach((k) => {
          if (SENSITIVE.some((s) => k.toLowerCase().includes(s))) delete obj[k];
          else clean(obj[k]);
        });
      };
      clean(copy);
      return copy;
    } catch (_) {
      return {};
    }
  }
}

// Factory
export function csa(serviceName, config) {
  if (!serviceName) return new CsaService('default', config);
  if (!services[serviceName]) services[serviceName] = new CsaService(serviceName, config);
  return services[serviceName];
}

// Plugin registration
csa.plugin = function (pluginFn) {
  try {
    if (typeof pluginFn !== 'function') return;
    const api = {
      global: window,
      time: () => Date.now(),
      on: (e, cb) => csa('__plugins').on(e, cb),
      emit: (e, d) => csa('__plugins').emit(e, d),
      error: (msg) => console.error('CSA Plugin:', msg),
      warn: (msg) => console.warn('CSA Plugin:', msg),
    };
    pluginFn(api);
  } catch (e) {
    console.error('CSA plugin registration failed:', e);
  }
};

// Expose on window
if (typeof window !== 'undefined') {
  window.csa = csa;
}
