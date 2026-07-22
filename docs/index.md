# Storefront Web

Next.js storefront frontend, consumes [storefront-api](../storefront-api).

## Local development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Configuration

`NEXT_PUBLIC_API_BASE_URL` — base URL for the API, baked in at build time (Next.js requirement). Set via Docker build arg, not a runtime env var.

## Deployment

Deployed via Helm chart in this repo's `chart/` directory, exposed at `storefront.local/` through ingress-nginx.