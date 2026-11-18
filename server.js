// 零依赖静态服务器：直接提供 site/ 里的导出页面，图片与视频复用 public/。
// 不依赖在线构建，服务几秒内即可启动。
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = path.join(ROOT, "site");
const PUBLIC = path.join(ROOT, "public");
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function safeJoin(base, rel) {
  const p = path.normalize(path.join(base, rel));
  return p.startsWith(base) ? p : null;
}

function resolveFile(urlPath) {
  let rel;
  try {
    rel = decodeURIComponent(urlPath.split("?")[0]);
  } catch {
    return null;
  }
  if (rel === "/" || rel === "") rel = "/index.html";

  const candidates = [
    ["site", rel],
    ["site", rel + ".html"],
    ["site", path.join(rel, "index.html")],
    ["public", rel],
  ];
  for (const [base, r] of candidates) {
    const root = base === "site" ? SITE : PUBLIC;
    const f = safeJoin(root, r);
    if (f && fs.existsSync(f) && fs.statSync(f).isFile()) {
      return { file: f, isHtml: path.extname(f) === ".html" };
    }
  }
  return null;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  if (body) res.end(body);
  else res.end();
}

http
  .createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return send(res, 405, { Allow: "GET, HEAD" }, "Method Not Allowed");
    }
    const hit = resolveFile(req.url || "/");
    if (!hit) {
      const notFound = safeJoin(SITE, "404.html");
      if (notFound && fs.existsSync(notFound)) {
        const buf = fs.readFileSync(notFound);
        return send(res, 404, { "Content-Type": MIME[".html"], "Cache-Control": "no-store" }, req.method === "HEAD" ? null : buf);
      }
      return send(res, 404, { "Content-Type": "text/plain" }, "Not Found");
    }

    const ext = path.extname(hit.file).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const size = fs.statSync(hit.file).size;
    // 页面不缓存，避免内容更新后被网关钉在旧版本；静态资源可长缓存
    const cache = hit.isHtml ? "no-store" : "public, max-age=86400";
    const base = {
      "Content-Type": type,
      "Cache-Control": cache,
      "Accept-Ranges": "bytes",
    };

    const range = req.headers.range;
    if (range && /^bytes=\d*-?\d*$/.test(range)) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      let start = m[1] ? parseInt(m[1], 10) : 0;
      let end = m[2] ? parseInt(m[2], 10) : size - 1;
      if (Number.isNaN(start) || start >= size) {
        return send(res, 416, { ...base, "Content-Range": `bytes */${size}` }, "Range Not Satisfiable");
      }
      end = Math.min(end, size - 1);
      res.writeHead(206, {
        ...base,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": end - start + 1,
      });
      if (req.method === "HEAD") return res.end();
      return fs.createReadStream(hit.file, { start, end }).pipe(res);
    }

    res.writeHead(200, { ...base, "Content-Length": size });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(hit.file).pipe(res);
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log(`portfolio static server listening on 0.0.0.0:${PORT}`);
  });
