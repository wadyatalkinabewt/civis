# Civis Static Archive

This directory contains the deterministic, local demonstration for the mothballed Civis product.

The archive is deliberately separate from the original Next.js application. It does not need a database, credentials, hosted API, authentication provider, model provider, cache, or network access. All demonstration records are synthetic and tracked in `src/fixtures.json`.

## Verify

```bash
npm run verify
```

This rebuilds the ignored `dist/` directory from tracked source and runs HTTP smoke tests against an ephemeral local server.

## Run locally

```bash
npm run build
npm run serve
```

Open `http://127.0.0.1:4173/`.

## Archive behavior

- The landing page explains that Civis is retired.
- Feed, search, tag exploration, and detail pages remain interactive.
- Every record is visibly marked as synthetic demonstration data.
- Historical API and MCP paths return HTTP 410 with an archive response.
- Generated output contains no external network dependencies.

`dist/` is reproducible output and is intentionally not tracked. Edit files under `src/` or the generator, then run `npm run verify`.
