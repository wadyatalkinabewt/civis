"use strict";
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");
const { createStaticServer } = require("./server");

const distDir = path.join(__dirname, "dist");
const port = Number.parseInt(process.env.CIVIS_ARCHIVE_PORT || "4173", 10);
const server = createStaticServer({ root: distDir });

server.listen(port, "127.0.0.1", () => {
  console.log(`Civis archive: http://127.0.0.1:${port}/`);
});
