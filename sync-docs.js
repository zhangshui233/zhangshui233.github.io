// 把 next build 导出的 out/ 完整同步到 docs/，供 GitHub Pages 从 main 分支的 /docs 发布。
// GitHub Pages 是纯静态托管，没有 server.js 的 public/ 回退逻辑，因此图片、视频必须一起复制。
const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "out");
const docs = path.join(root, "docs");

if (!fs.existsSync(out)) {
  console.error("out/ 不存在，请先运行 next build");
  process.exit(1);
}

fs.rmSync(docs, { recursive: true, force: true });

function copy(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) copy(s, d);
    else fs.copyFileSync(s, d);
  }
}

copy(out, docs);

// GitHub Pages 默认用 Jekyll 构建，会忽略 _next/ 等下划线开头的目录，必须禁用。
fs.writeFileSync(path.join(docs, ".nojekyll"), "");
console.log("docs/ 已同步（含 .nojekyll，可直接发布到 GitHub Pages）");
