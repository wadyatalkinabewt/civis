"use strict";
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const http = require("http");
const path = require("path");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"]
]);

function archiveResponse(response, pathname) {
  const body = JSON.stringify(
    {
      status: "archived",
      message: "The Civis hosted service is retired. This repository contains a local static demonstration.",
      path: pathname
    },
    null,
    2
  );
  response.writeHead(410, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8"
  });
  response.end(body);
}

function safeFilePath(root, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const relative = decoded.replace(/^\/+/, "");
  const candidate = path.resolve(root, relative);
  const expectedRoot = path.resolve(root) + path.sep;
  if (candidate !== path.resolve(root) && !candidate.startsWith(expectedRoot)) return null;

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    const index = path.join(candidate, "index.html");
    if (fs.existsSync(index)) return index;
  }

  const htmlCandidate = `${candidate}.html`;
  if (fs.existsSync(htmlCandidate)) return htmlCandidate;
  const directoryIndex = path.join(candidate, "index.html");
  if (fs.existsSync(directoryIndex)) return directoryIndex;
  return null;
}

function createStaticServer({ root }) {
  const resolvedRoot = path.resolve(root);
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1");
    if (url.pathname.startsWith("/api/") || url.pathname === "/mcp" || url.pathname === "/sse") {
      archiveResponse(response, url.pathname);
      return;
    }

    const filePath = safeFilePath(resolvedRoot, url.pathname);
    if (!filePath) {
      const fallback = path.join(resolvedRoot, "404.html");
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      response.end(fs.readFileSync(fallback));
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "cache-control": extension === ".html" ? "no-cache" : "public, max-age=3600",
      "content-type": contentTypes.get(extension) || "application/octet-stream",
      "x-content-type-options": "nosniff"
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

module.exports = { createStaticServer };
