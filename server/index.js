// Minimal zero-dependency HTTP API for the portfolio admin.
// Endpoints:
//   POST /api/login            { username, password } -> { token }
//   GET  /api/content          -> { projects, journeyItems, community }
//   POST /api/projects         (admin) add a project
//   POST /api/journey          (admin) add a journey item
//   POST /api/community        (admin) add a community/volunteer item
//   DELETE /api/projects|journey|community/<id|slug|title>  (admin) remove an added item
//
// Storage: data.json next to this file (created on first write).
// Run with: npm run server  (default port 3001, override with PORT env var)

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data.json");

// Change these credentials before deploying (or set ADMIN_USERNAME / ADMIN_PASSWORD env vars).
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const PORT = Number(process.env.PORT) || 3001;

// In-memory sessions: token -> expiry timestamp
const sessions = new Map();
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8" };

function send(res, status, payload) {
  res.writeHead(status, jsonHeaders);
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return { projects: [], journeyItems: [], community: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function isValidToken(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || !sessions.has(token)) return false;
  const expiry = sessions.get(token);
  if (Date.now() > expiry) {
    sessions.delete(token);
    return false;
  }
  return true;
}

function toList(value, separator) {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  return String(value || "")
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}

function slugify(text, fallback) {
  const slug = String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  try {
    // Public content endpoint (no auth): merged into the frontend defaults.
    if (req.method === "GET" && pathname === "/api/content") {
      const data = loadData();
      return send(res, 200, {
        projects: data.projects || [],
        journeyItems: data.journeyItems || [],
        community: data.community || [],
      });
    }

    // Admin login -> session token
    if (req.method === "POST" && pathname === "/api/login") {
      const body = await readBody(req);
      const { username, password } = body;
      if (
        username === ADMIN_USERNAME &&
        typeof password === "string" &&
        password === ADMIN_PASSWORD
      ) {
        const token = crypto.randomBytes(32).toString("hex");
        sessions.set(token, Date.now() + SESSION_TTL_MS);
        return send(res, 200, { token });
      }
      return send(res, 401, { error: "Identifiants invalides." });
    }

    // Everything below requires a valid admin token.
    if (!isValidToken(req)) {
      return send(res, 401, { error: "Non autorisé." });
    }

    if (req.method === "POST" && pathname === "/api/projects") {
      const body = await readBody(req);
      const { title, subtitle, desc } = body;
      if (!title || !desc) {
        return send(res, 400, { error: "title et desc sont requis." });
      }
      const data = loadData();
      const project = {
        id: crypto.randomUUID(),
        n: String(data.projects.length + 1).padStart(2, "0"),
        title,
        subtitle: subtitle || "",
        desc,
        tags: toList(body.tags, ",").map((t) => t.toUpperCase()),
        highlights: toList(body.highlights, "\n"),
        type: "custom",
      };
      data.projects.push(project);
      saveData(data);
      return send(res, 201, project);
    }

    if (req.method === "POST" && pathname === "/api/journey") {
      const body = await readBody(req);
      const { year, title } = body;
      if (!title || !year) {
        return send(res, 400, { error: "title et year sont requis." });
      }
      const data = loadData();
      const overview = body.overview || body.desc || "";
      const semesters = Array.isArray(body.semesters) && body.semesters.length
        ? body.semesters
        : [{ name: "Modules", modules: toList(body.modules, "\n") }];
      const item = {
        id: crypto.randomUUID(),
        slug: slugify(body.slug || title, `etape-${data.journeyItems.length + 1}`),
        year,
        title,
        desc: body.desc || overview,
        institutionName: body.institutionName || "",
        institutionLink: body.institutionLink || "",
        overview,
        semesters: semesters.map((sem) => ({
          name: sem.name || "Modules",
          modules: toList(sem.modules, "\n"),
        })),
        skills: toList(body.skills, ","),
        experiences: toList(body.experiences, "\n"),
        goals: body.goals || "",
      };
      data.journeyItems.push(item);
      saveData(data);
      return send(res, 201, item);
    }

    if (req.method === "POST" && pathname === "/api/community") {
      const body = await readBody(req);
      const { title, desc } = body;
      if (!title || !desc) {
        return send(res, 400, { error: "title et desc sont requis." });
      }
      const data = loadData();
      const item = {
        id: crypto.randomUUID(),
        n: String(data.community.length + 1).padStart(2, "0"),
        period: body.period || "",
        title,
        subtitle: body.subtitle || "",
        desc,
        tags: toList(body.tags, ",").map((t) => t.toUpperCase()),
        org: body.org || "",
        impact: body.impact || "",
        type: "custom",
      };
      data.community.push(item);
      saveData(data);
      return send(res, 201, item);
    }

    // DELETE /api/{projects|journey|community}/<key> — remove an added item.
    // key = its id, or slug (journey), or title (legacy items without id), or index.
    const delMatch = pathname.match(/^\/api\/(projects|journey|community)\/(.+)$/);
    if (req.method === "DELETE" && delMatch) {
      const collection = delMatch[1] === "journey" ? "journeyItems" : delMatch[1];
      const key = decodeURIComponent(delMatch[2]);
      const data = loadData();
      const list = Array.isArray(data[collection]) ? data[collection] : [];
      const index = list.findIndex(
        (item, i) =>
          String(item?.id || "") === key ||
          String(item?.slug || "") === key ||
          String(item?.title || "") === key ||
          String(i) === key,
      );
      if (index === -1) {
        return send(res, 404, { error: "Élément introuvable." });
      }
      list.splice(index, 1);
      // Keep the displayed numbering (n) coherent after a removal.
      if (collection !== "journeyItems") {
        list.forEach((item, i) => {
          item.n = String(i + 1).padStart(2, "0");
        });
      }
      data[collection] = list;
      saveData(data);
      return send(res, 200, { ok: true, removed: index });
    }

    return send(res, 404, { error: "Route inconnue." });
  } catch (err) {
    return send(res, 400, { error: err.message || "Requête invalide." });
  }
});

server.listen(PORT, () => {
  console.log(`✅ Portfolio API prête sur http://localhost:${PORT}`);
});
