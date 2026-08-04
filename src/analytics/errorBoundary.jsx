/**
 * errorBoundary.jsx — Global React Error Boundary + window.onerror handler
 * Catches all uncaught errors, logs them with CSM, and shows fallback UI
 */
import React from 'react';
import { csm } from './csm.js';

const MAX_ERRORS_PER_SESSION = 50;
const ERROR_COUNT_KEY = 'ue_error_count';

function getErrorCount() {
  try { return parseInt(sessionStorage.getItem(ERROR_COUNT_KEY) || '0', 10); } catch (_) { return 0; }
}
function incrementErrorCount() {
  try { sessionStorage.setItem(ERROR_COUNT_KEY, getErrorCount() + 1); } catch (_) {}
}

function logError(error, context = {}) {
  if (getErrorCount() >= MAX_ERRORS_PER_SESSION) return;
  incrementErrorCount();
  const severity = context.severity || 'ERROR';
  csm.tag(`error_severity_${severity.toLowerCase()}`, true);
  csm.count('js_errors', 1);
  csm.uex('error', context.attribution || 'ErrorBoundary', {
    message: error?.message || String(error),
    stack: error?.stack || 'N/A',
    ...context,
  });
}

// ── Global handlers ───────────────────────────────────────────────────────────
if (typeof window !== 'undefined') {
  window.onerror = function (message, source, lineno, colno, error) {
    logError(error || { message }, { attribution: `${source}:${lineno}:${colno}`, severity: 'ERROR' });
    return false; // Don't suppress default browser error handling
  };

  window.onunhandledrejection = function (event) {
    logError(event.reason || { message: 'Unhandled Promise rejection' }, {
      attribution: 'UnhandledRejection',
      severity: 'ERROR',
    });
  };

  // Expose for inline scripts
  window.ueLogError = function (error, context) {
    logError(error, context);
  };
}

// ── React Error Boundary ──────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logError(error, {
      attribution: 'ReactErrorBoundary',
      severity: 'FATAL',
      componentStack: info.componentStack,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', padding: '2rem',
          background: '#f8fafc', fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
            padding: '2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ color: '#1e293b', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              An unexpected error occurred. Our team has been notified.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: '#f97316', color: '#fff', border: 'none', borderRadius: '8px',
                padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer', fontWeight: 600,
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary, logError };
