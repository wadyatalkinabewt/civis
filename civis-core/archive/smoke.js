"use strict";
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const { createStaticServer } = require("./server");

const distDir = path.join(__dirname, "dist");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function check(baseUrl, pathname, expectedStatus, text) {
  const response = await fetch(`${baseUrl}${pathname}`);
  assert(response.status === expectedStatus, `${pathname} returned ${response.status}, expected ${expectedStatus}`);
  const body = await response.text();
  if (text) assert(body.includes(text), `${pathname} did not contain expected text: ${text}`);
  return { response, body };
}

async function main() {
  assert(fs.existsSync(path.join(distDir, "index.html")), "Run npm run build before smoke testing.");
  const data = JSON.parse(fs.readFileSync(path.join(distDir, "archive-data.json"), "utf8"));
  assert(Array.isArray(data.records) && data.records.length === 6, "Expected six archive fixtures.");
  assert(data.records.every((record) => record.synthetic === true), "Every archive record must be synthetic.");

  const server = createStaticServer({ root: distDir });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;
    await check(baseUrl, "/", 200, "Mothballed product archive");
    await check(baseUrl, "/app/", 200, "Synthetic demonstration data");
    await check(baseUrl, "/app/search/", 200, "Search the archive fixtures");
    await check(baseUrl, "/app/explore/", 200, "Explore by implementation stack");
    await check(baseUrl, `/app/${data.records[0].id}/`, 200, "Synthetic build log");
    await check(baseUrl, "/docs/", 200, "Historical architecture");
    await check(baseUrl, "/assets/styles.css", 200, ":root");
    await check(baseUrl, "/archive-data.json", 200, '"synthetic": true');
    await check(baseUrl, "/api/v1/constructs", 410, '"status": "archived"');
    await check(baseUrl, "/mcp", 410, '"status": "archived"');
    await check(baseUrl, "/missing-page", 404, "This archive page does not exist");
    await check(baseUrl, "/%E0%A4%A", 404, "This archive page does not exist");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  console.log("Civis archive smoke tests passed: 12 routes, 6 synthetic records.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
