import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Video from "../models/Video.js";
import VideoComment from "../models/VideoComment.js";
import VideoUserState from "../models/VideoUserState.js";
import { CHANNELS } from "../../data/videoLibrary.js";

const router = express.Router();

const createCacheStore = () => {
  const store = new Map();
  return {
    get(key) {
      const entry = store.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expiry) {
        store.delete(key);
        return null;
      }
      return entry.value;
    },
    set(key, value, ttl = 15000) {
      store.set(key, { value, expiry: Date.now() + ttl });
    },
    delete(key) {
      store.delete(key);
    },
    clear(prefix) {
      if (!prefix) {
        store.clear();
        return;
      }
      for (const key of Array.from(store.keys())) {
        if (key.startsWith(prefix)) {
          store.delete(key);
        }
      }
    },
  };
};

const responseCache = createCacheStore();

const invalidateCache = (pattern) => {
  if (!pattern) {
    responseCache.clear();
    return;
  }
  responseCache.clear(pattern);
};

const setCacheHeaders = (res, seconds = 20, status = "MISS") => {
  res.setHeader(
    "Cache-Control",
    `public, max-age=${seconds}, stale-while-revalidate=30`,
  );
  res.setHeader("X-Cache-Status", status);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Upload Setup
const uploadDir = path.join(process.cwd(), "backend", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max limit
});

const normalize = (value) =>
  value ? value.toString().trim().toLowerCase() : "";

const findOrCreateState = async (email) => {
  const normalizedEmail = normalize(email) || "guest@dpt.com";
  let state = await VideoUserState.findOne({ email: normalizedEmail });
  if (!state) {
    state = await VideoUserState.create({ email: normalizedEmail });
  }
  return state;
};

// GET /api/videos - list videos with filters
router.get("/", async (req, res) => {
  try {
    const cacheKey = `videos:${JSON.stringify(req.query)}`;
    const cached = responseCache.get(cacheKey);
    if (cached) {
      setCacheHeaders(res, 20, "HIT");
      return res.json(cached);
    }

    const { search, section, category } = req.query;
    let query = {};

    if (section === "Shorts") {
      query.type = "shorts";
    } else if (section === "Long Form") {
      query.type = "longform";
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      const term = search.trim();
      query.$or = [
        { title: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
        { tags: { $in: [new RegExp(term, "i")] } },
        { category: { $regex: term, $options: "i" } },
      ];
    }

    const results = await Video.find(query).sort({ createdAt: -1 }).lean();
    responseCache.set(cacheKey, results, 20000);
    setCacheHeaders(res, 20, "MISS");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// GET /api/videos/channels - get list of channels
router.get("/channels", async (req, res) => {
  try {
    const cacheKey = "channels:list";
    const cached = responseCache.get(cacheKey);
    if (cached) {
      setCacheHeaders(res, 60, "HIT");
      return res.json(cached);
    }

    const customStates = await VideoUserState.find({
      $or: [{ channelName: { $ne: "" } }, { channelBio: { $ne: "" } }],
    }).lean();

    const customChannels = customStates.map((state) => ({
      id: state.email,
      name: state.channelName || state.email.split("@")[0],
      logo:
        state.channelAvatar ||
        `https://picsum.photos/seed/${state.email}/120/120`,
      banner: "https://picsum.photos/seed/dptbanner/1400/400",
      description: state.channelBio || "Custom workshop member channel",
      subscribers: 0,
      videos: 0,
      country: "India",
      joined: new Date(state.createdAt).getFullYear().toString(),
    }));

    const payload = [...CHANNELS, ...customChannels];
    responseCache.set(cacheKey, payload, 60000);
    setCacheHeaders(res, 60, "MISS");
    res.json(payload);
  } catch (err) {
    console.error(err);
    res.json(CHANNELS);
  }
});

// GET /api/videos/channels/:id - get channel details
router.get("/channels/:id", async (req, res) => {
  const channelId = req.params.id;
  const cacheKey = `channels:${channelId}`;
  const cached = responseCache.get(cacheKey);
  if (cached) {
    setCacheHeaders(res, 60, "HIT");
    return res.json(cached);
  }

  const seedChannel = CHANNELS.find((c) => c.id === channelId);
  if (seedChannel) {
    setCacheHeaders(res, 60, "MISS");
    responseCache.set(cacheKey, seedChannel, 60000);
    return res.json(seedChannel);
  }

  try {
    const state = await VideoUserState.findOne({
      email: channelId.toLowerCase(),
    }).lean();
    if (state) {
      const channelData = {
        id: state.email,
        name: state.channelName || state.email.split("@")[0],
        logo:
          state.channelAvatar ||
          `https://picsum.photos/seed/${state.email}/120/120`,
        banner: "https://picsum.photos/seed/dptbanner/1400/400",
        description: state.channelBio || "Custom workshop member channel",
        subscribers: 0,
        videos: 0,
        country: "India",
        joined: new Date(state.createdAt).getFullYear().toString(),
      };
      responseCache.set(cacheKey, channelData, 60000);
      setCacheHeaders(res, 60, "MISS");
      return res.json(channelData);
    }
    res.status(404).json({ error: "Channel not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/videos/state - fetch user state
router.get("/state", async (req, res) => {
  try {
    const state = await findOrCreateState(req.query.email || "guest@dpt.com");
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to load user state" });
  }
});

// POST /api/videos/state/history - update watch history
router.post("/state/history", async (req, res) => {
  try {
    const { email, videoId } = req.body;
    const state = await findOrCreateState(email);

    // Filter out existing history entry for this videoId to move it to the top
    state.history = state.history.filter((item) => item.videoId !== videoId);
    state.history.unshift({ videoId, watchedAt: new Date() });
    state.history = state.history.slice(0, 50); // limit to 50 items

    await state.save();

    // Increment view count of the video in background
    await Video.findOneAndUpdate({ id: videoId }, { $inc: { views: 1 } });
    invalidateCache(`video:${videoId}`);
    invalidateCache("videos:");

    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to save history" });
  }
});

// POST /api/videos/state/history/clear - clear watch history
router.post("/state/history/clear", async (req, res) => {
  try {
    const { email } = req.body;
    const state = await findOrCreateState(email);
    state.history = [];
    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear history" });
  }
});

// POST /api/videos/state/like - toggle like video
router.post("/state/like", async (req, res) => {
  try {
    const { email, videoId } = req.body;
    const state = await findOrCreateState(email);
    const index = state.likedVideoIds.indexOf(videoId);
    let inc = 0;
    if (index === -1) {
      state.likedVideoIds.push(videoId);
      inc = 1;
    } else {
      state.likedVideoIds.splice(index, 1);
      inc = -1;
    }
    await state.save();

    await Video.findOneAndUpdate({ id: videoId }, { $inc: { likes: inc } });
    invalidateCache(`video:${videoId}`);
    invalidateCache("videos:");

    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to update like state" });
  }
});

// POST /api/videos/state/watchlater - toggle watch later
router.post("/state/watchlater", async (req, res) => {
  try {
    const { email, videoId } = req.body;
    const state = await findOrCreateState(email);
    const index = state.watchLaterIds.indexOf(videoId);
    if (index === -1) {
      state.watchLaterIds.push(videoId);
    } else {
      state.watchLaterIds.splice(index, 1);
    }
    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to update watch later state" });
  }
});

// POST /api/videos/state/subscribe - toggle channel subscription
router.post("/state/subscribe", async (req, res) => {
  try {
    const { email, channelId } = req.body;
    const state = await findOrCreateState(email);
    const index = state.subscriptions.indexOf(channelId);
    if (index === -1) {
      state.subscriptions.push(channelId);
    } else {
      state.subscriptions.splice(index, 1);
    }
    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to update subscriptions" });
  }
});

// POST /api/videos/state/download - record video download
router.post("/state/download", async (req, res) => {
  try {
    const { email, videoId } = req.body;
    const state = await findOrCreateState(email);
    if (!state.downloadedVideoIds.includes(videoId)) {
      state.downloadedVideoIds.push(videoId);
    }
    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to record download" });
  }
});

// POST /api/videos/channel/customize - customize channel profile
router.post("/channel/customize", async (req, res) => {
  try {
    const { email, channelName, channelBio, channelAvatar } = req.body;
    const state = await findOrCreateState(email);

    if (channelName !== undefined) state.channelName = channelName.trim();
    if (channelBio !== undefined) state.channelBio = channelBio.trim();
    if (channelAvatar !== undefined) state.channelAvatar = channelAvatar;

    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: "Failed to customize channel" });
  }
});

// POST /api/videos/upload - handle video and thumbnail upload
router.post(
  "/upload",
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "posterFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description, category, type, tags, email } = req.body;
      const files = req.files;

      if (!files || !files.videoFile) {
        return res.status(400).json({ error: "Video file is required" });
      }

      const videoFile = files.videoFile[0];
      const posterFile = files.posterFile ? files.posterFile[0] : null;

      const uniqueId = `user-video-${Date.now()}`;
      const videoUrl = `/uploads/${videoFile.filename}`;
      const posterUrl = posterFile
        ? `/uploads/${posterFile.filename}`
        : `https://picsum.photos/seed/${uniqueId}/900/506`;

      const tagArray = tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const newVideo = await Video.create({
        id: uniqueId,
        title: title || "Untitled Video",
        description: description || "",
        poster: posterUrl,
        videoUrl: videoUrl,
        youtubeUrl: "",
        type: type || "longform",
        duration: "0:45", // default mock duration
        views: 0,
        likes: 0,
        category: category || "General",
        tags: tagArray,
        channelId: email || "guest@dpt.com",
        uploaderEmail: email || "guest@dpt.com",
      });

      invalidateCache("videos:");
      invalidateCache(`video:${newVideo.id}`);

      res.status(201).json(newVideo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload video" });
    }
  },
);

// GET /api/videos/stream/:id - chunked range streaming
router.get("/stream/:id", async (req, res) => {
  try {
    const video = await Video.findOne({ id: req.params.id });
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.youtubeUrl && !video.videoUrl) {
      return res.redirect(video.youtubeUrl);
    }

    const videoPath = path.join(process.cwd(), "backend", video.videoUrl);
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    const ext = path.extname(videoPath).slice(1).toLowerCase();
    const contentType =
      ext === "webm" ? "video/webm" : ext === "ogg" ? "video/ogg" : "video/mp4";

    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=60",
    );

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            "Requested range not satisfiable\n" + start + " >= " + fileSize,
          );
        return;
      }

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": contentType,
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to stream video" });
  }
});

// GET /api/videos/download/:id - download as range stream attachment
router.get("/download/:id", async (req, res) => {
  try {
    const video = await Video.findOne({ id: req.params.id });
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.videoUrl) {
      const videoPath = path.join(process.cwd(), "backend", video.videoUrl);
      if (fs.existsSync(videoPath)) {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${video.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4"`,
        );
        return fs.createReadStream(videoPath).pipe(res);
      }
    }

    // Fallback redirect for YouTube links
    return res.redirect(video.youtubeUrl || video.videoUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to download video" });
  }
});

// GET /api/videos/:id/comments - fetch comments
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await VideoComment.find({ videoId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

// POST /api/videos/:id/comments - post comment
router.post("/:id/comments", async (req, res) => {
  try {
    const { name, text } = req.body;
    if (!name || !text) {
      return res.status(400).json({ error: "Name and comment are required" });
    }
    const comment = await VideoComment.create({
      videoId: req.params.id,
      name,
      text,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// GET /api/videos/:id - get single video
router.get("/:id", async (req, res) => {
  try {
    const cacheKey = `video:${req.params.id}`;
    const cached = responseCache.get(cacheKey);
    if (cached) {
      setCacheHeaders(res, 30, "HIT");
      const etag = `"${cached._id}-${new Date(cached.updatedAt).getTime()}"`;
      res.setHeader("ETag", etag);
      if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
      }
      return res.json(cached);
    }

    const video = await Video.findOne({ id: req.params.id }).lean();
    if (!video) return res.status(404).json({ error: "Video not found" });

    const etag = `"${video._id}-${new Date(video.updatedAt).getTime()}"`;
    res.setHeader("ETag", etag);
    res.setHeader("Last-Modified", new Date(video.updatedAt).toUTCString());
    responseCache.set(cacheKey, video, 30000);
    setCacheHeaders(res, 30, "MISS");
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
