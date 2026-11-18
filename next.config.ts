import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 导出为纯静态站点：线上不再需要现场构建，服务几秒内即可启动。
  output: "export",
  // 每个页面导出成 xxx/index.html，GitHub Pages 等纯静态托管才能直接访问无扩展名地址。
  trailingSlash: true,
  allowedDevOrigins: ['roger-drive-freight-sam.trycloudflare.com'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
