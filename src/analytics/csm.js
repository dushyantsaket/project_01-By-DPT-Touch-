/**
 * csm.js — Customer Session Metrics core
 * Safe wrappers for ue.exec, ue.count, ue.tag, uet, uex, ue.stub
 */
import { defaultBatcher } from './batcher.js';

const SESSION_KEY = 'ue_id';

function getSessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = 'sess-' + Math.random().toString(36).slice(2) + '-' + Date.now();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch (_) {
    return 'sess-unknown';
  }
}

const sessionId = getSessionId();

function enqueue(type, name, data) {
  defaultBatcher.enqueue({
    type,
    name,
    data,
    timestamp: Date.now(),
    sessionId,
    pageUrl: window.location.href,
  });
}

// ─── ue.exec ──────────────────────────────────────────────────────────────────
function exec(callback, name, context, ...args) {
  try {
    if (typeof callback !== 'function') {
      console.warn(`ue.exec: ${name} — callback is not a function`);
      return null;
    }
    return callback.apply(context || window, args);
  } catch (error) {
    console.error(`ue.exec [${name || 'anonymous'}] failed:`, error);
    enqueue('error', name, { message: error.message, stack: error.stack });
    return null;
  }
}

// ─── ue.count ─────────────────────────────────────────────────────────────────
const _counters = {};
function count(counterName, value = 1) {
  try {
    if (!counterName || typeof counterName !== 'string') return null;
    _counters[counterName] = (_counters[counterName] || 0) + value;
    enqueue('csm_count', counterName, { value: _counters[counterName] });
    return _counters[counterName];
  } catch (error) {
    console.error('ue.count failed:', error);
    return null;
  }
}

// ─── ue.tag ───────────────────────────────────────────────────────────────────
const _tags = {};
function tag(tagName, value = true) {
  try {
    if (!tagName || typeof tagName !== 'string') return false;
    _tags[tagName] = value;
    enqueue('csm_tag', tagName, { value });
    return true;
  } catch (error) {
    console.error('ue.tag failed:', error);
    return false;
  }
}

// ─── uet (timing events) ──────────────────────────────────────────────────────
const VALID_EVENTS = ['bb', 'be', 'cf', 'af', 'ld', 'fn', 'fp', 'fcp'];
function uet(eventType, name, options, timestamp) {
  try {
    if (!VALID_EVENTS.includes(eventType)) {
      console.warn(`uet: invalid event type "${eventType}"`);
      return;
    }
    const eventTime = timestamp || Date.now();
    enqueue('csm_timing', eventType, { name, time: eventTime, options });
  } catch (error) {
    console.error('uet failed:', error);
  }
}

// ─── uex (send events) ────────────────────────────────────────────────────────
function uex(eventType, name, options, timestamp) {
  try {
    enqueue('csm_event', eventType, {
      name,
      options,
      timestamp: timestamp || Date.now(),
    });
  } catch (error) {
    console.error('uex failed:', error);
  }
}

// ─── ue.stub ──────────────────────────────────────────────────────────────────
function stub(obj, methodName) {
  try {
    if (typeof obj[methodName] !== 'undefined') return;
    const queue = [];
    obj[methodName] = function (...args) {
      queue.push({ args, timestamp: Date.now() });
    };
    obj[methodName].replay = (cb) => queue.forEach((item) => cb(...item.args));
    obj[methodName].isStub = true;
    obj[methodName].queue = queue;
  } catch (error) {
    console.error('ue.stub failed:', error);
  }
}

export const csm = { exec, count, tag, uet, uex, stub, sessionId };

// Expose on window for compatibility with inline scripts
if (typeof window !== 'undefined') {
  window.ue = window.ue || {};
  Object.assign(window.ue, { exec, count, tag, stub });
  window.uet = uet;
  window.uex = uex;
}
