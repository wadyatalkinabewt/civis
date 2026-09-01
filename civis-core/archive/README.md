# Civis Static Archive

This directory contains a deterministic, local reconstruction of the retired Civis product.

The archive is deliberately separate from the original Next.js application. It does not need a database, credentials, hosted API, authentication provider, model provider, cache, or network access. Its navigation, ledger feed, Search, Explore, and record-detail views follow the original application, while all six sample records are synthetic and tracked in `src/fixtures.json`.

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

- The root opens directly into the reconstructed Civis feed.
- Feed, Search, Explore, and detail pages preserve the original visual language and remain interactive.
- The interface identifies itself once as an archive demo with sample records. Individual cards are not covered in repetitive disclosure labels.
- Historical API and MCP paths return HTTP 410 with an archive response.
- Generated output contains no external network dependencies.

`dist/` is reproducible output and is intentionally not tracked. Edit files under `src/` or the generator, then run `npm run verify`.
