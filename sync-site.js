// 把 next build 导出的 out/ 同步到 site/（图片、视频仍复用 public/，不重复打包）。
const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "out");
const site = path.join(root, "site");

if (!fs.existsSync(out)) {
  console.error("out/ 不存在，请先运行 next build");
  process.exit(1);
}

fs.rmSync(site, { recursive: true, force: true });

function copy(src, dst, top) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (top && (e.name === "images" || e.name === "videos")) continue;
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) copy(s, d, false);
    else fs.copyFileSync(s, d);
  }
}

copy(out, site, true);
console.log("site/ 已同步（HTML + _next；图片/视频读 public/）");
