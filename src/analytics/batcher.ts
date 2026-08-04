// Batcher for analytics events
// Handles queueing, periodic flush, sendBeacon fallback, XHR fallback, exponential backoff, and offline persistence.

const BATCH_KEY = 'analytics_queue';
const FLUSH_INTERVAL = 5000; // 5 seconds default
const MAX_RETRIES = 3;
const BASE_BACKOFF = 1000; // 1 second

interface AnalyticsEvent {
  type: string;
  payload: any;
  timestamp: number;
}

export class Batcher {
  private endpoint: string;
  private queue: AnalyticsEvent[] = [];
  private flushTimer: any = null;
  private isFlushing = false;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.loadQueue();
    this.start();
    window.addEventListener('storage', (e) => {
      if (e.key === BATCH_KEY) this.loadQueue();
    });
  }

  enqueue(event: AnalyticsEvent) {
    this.queue.push(event);
    this.saveQueue();
  }

  private saveQueue() {
    try { localStorage.setItem(BATCH_KEY, JSON.stringify(this.queue)); } catch (_) {}
  }

  private loadQueue() {
    try {
      const data = localStorage.getItem(BATCH_KEY);
      this.queue = data ? JSON.parse(data) : [];
    } catch (_) { this.queue = []; }
  }

  start() {
    if (this.flushTimer) return;
    this.flushTimer = setInterval(() => this.flush(), FLUSH_INTERVAL);
  }

  stop() {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.flushTimer = null;
  }

  private async sendPayload(payload: string, retry: number): Promise<boolean> {
    // Try sendBeacon first
    if (navigator.sendBeacon) {
      const success = navigator.sendBeacon(this.endpoint, payload);
      if (success) return true;
    }
    // Fallback to fetch with keepalive
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
      return response.ok;
    } catch (e) {
      if (retry < MAX_RETRIES - 1) {
        const delay = BASE_BACKOFF * Math.pow(2, retry);
        await new Promise((r) => setTimeout(r, delay));
        return this.sendPayload(payload, retry + 1);
      }
      console.error('Analytics batch failed after retries', e);
      return false;
    }
  }

  async flush() {
    if (this.isFlushing || this.queue.length === 0) return;
    this.isFlushing = true;
    const payload = JSON.stringify(this.queue);
    const success = await this.sendPayload(payload, 0);
    if (success) {
      this.queue = [];
      this.saveQueue();
    }
    this.isFlushing = false;
  }
}

// Export a singleton; endpoint can be configured via env variable
const analyticsEndpoint = import.meta.env?.VITE_ANALYTICS_ENDPOINT || 'http://localhost:5001/1/events';
export const defaultBatcher = new Batcher(analyticsEndpoint);
