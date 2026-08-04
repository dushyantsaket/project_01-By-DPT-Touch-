import express from 'express';
import EventLog from '../models/EventLog.js';

const router = express.Router();

// Helper to save events to the DB
async function saveEvent(payload, ipAddress, userAgent) {
  try {
    let events = [];
    if (typeof payload === 'string') {
      try {
        events = JSON.parse(payload);
      } catch (e) {
        console.warn('Could not parse payload as JSON', payload);
        return;
      }
    } else if (Array.isArray(payload)) {
      events = payload;
    } else if (typeof payload === 'object' && payload !== null) {
      events = [payload];
    }

    const docs = events.map(event => ({
      type: event.type || 'unknown',
      name: event.name,
      data: event,
      timestamp: event.timestamp || new Date(),
      sessionId: event.requestId || event.options?.requestId || 'unknown',
      pageUrl: event.pageUrl || 'unknown',
      userAgent,
      ipAddress
    }));

    if (docs.length > 0) {
      await EventLog.insertMany(docs);
    }
  } catch (err) {
    console.error('Error saving analytics event:', err);
  }
}

// CSM / UE data tracking route
router.post('/rd/uedata', async (req, res) => {
  const payload = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  
  // Respond immediately so we don't block the beacon
  res.status(204).send();
  
  // Process in the background
  await saveEvent(payload, ip, userAgent);
});

// CSA and 1/events tracking route
router.post('/1/events', async (req, res) => {
  const payload = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];

  // Respond immediately 
  res.status(204).send();

  // Process in the background
  await saveEvent(payload, ip, userAgent);
});

export default router;
