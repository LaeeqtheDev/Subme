<h1 align="center">Subme</h1>

<p align="center">
  A tier-based subscription platform for creators — paid content gated by entitlement,
  enforced on the server rather than hidden in the UI.
</p>

<p align="center">
  <a href="https://subme-bay.vercel.app"><img src="https://img.shields.io/badge/Live_App-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live app"></a>
  <a href="https://subme.sanity.studio/"><img src="https://img.shields.io/badge/Sanity_Studio-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity Studio"></a>
</p>

---

## Overview

Creators publish posts behind three access tiers — **VIP**, **Crew** and **Backstage** — and subscribers see only what their tier entitles them to. VIP members can also message the creator directly, with usage limits attached to the tier rather than hardcoded per feature.

The visible product is a content feed. The actual engineering problem is **entitlement**: deciding, on every request, what a given user is currently allowed to see and do — and having that answer stay correct when someone upgrades, downgrades, lapses, or opens a page they were entitled to five minutes ago. Most of the design decisions below exist to keep that one question cheap to answer and impossible to answer wrongly.

---

## Architecture

**Authorization is a server concern.** Tier checks resolve during server rendering, before content reaches the client. This is the difference between gating and *hiding*: a client-side check ships the premium body to the browser and conditionally renders it, which means the paid content is one DevTools panel away from being free. Gated content is filtered out of the query result, so it never enters the serialized payload.

**Three layers, one responsibility each.** Clerk answers *who is this* (identity and session). Schematic answers *what are they entitled to* (plan, feature flags, usage limits). Sanity answers *what content exists at each tier*. Keeping identity, entitlement and content separate means a pricing change is a configuration change rather than a deployment — and it avoids the trap of encoding plan logic across a dozen conditionals.

**Route protection at the edge.** `middleware.ts` handles session validation and redirects before a request reaches a route handler, so unauthenticated access to protected paths costs a redirect rather than a render.

**Mutations through server actions.** Comment submission and messaging run as server actions in `actions/`, keeping write logic and its authorization check colocated on the server. No API route surface exists purely to be called by our own client.

**Types generated from the schema.** `sanity.types.ts` is generated from the Sanity schema rather than hand-written, so a content model change that isn't reflected in the application surfaces as a TypeScript error at build time instead of `undefined` in production. `GetPostQueryResult` types the full post shape — Portable Text body, `tierAccess` union, cover image with hotspot/crop/alt, and the comment array.

---

## Content Model

| Field | Type | Notes |
|---|---|---|
| `title` | `string` | Optional |
| `body` | Portable Text | Block content — headings, blockquote, lists, inline marks |
| `tierAccess` | `'vip' \| 'crew' \| 'backstage'` | Union type, not a free string — invalid tiers fail at compile time |
| `coverImage` | image | Hotspot and crop for art-directed responsive cropping; `alt` required |
| `comments` | array | `_id`, `name`, `email`, `comment` |

Portable Text is used rather than stored HTML or Markdown: it's structured data, so the same content renders correctly across surfaces and can't inject markup into the page.

---

## Tech Stack

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components make server-side gating the default rather than an add-on |
| Language | TypeScript | The tier union is the core invariant; a type system is what keeps it enforced |
| CMS | Sanity | Structured content with generated types and a hosted editing surface |
| Auth | Clerk | Session management and route protection without owning credential storage |
| Entitlement | Schematic | Plan and usage-limit logic external to application code |
| UI | Tailwind CSS + shadcn/ui | Component ownership in-repo, no runtime style cost |
| Package manager | pnpm | Content-addressed store; strict resolution surfaces phantom dependencies |

---

## Running Locally

Requires Node 18+ and pnpm.

```bash
git clone https://github.com/LaeeqtheDev/Subme.git
cd Subme
pnpm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=      # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                   # server-only — read token, never exposed to the client
```

```bash
pnpm dev            # http://localhost:3000
pnpm build          # production build
```

Only `NEXT_PUBLIC_*` variables reach the browser. `SANITY_API_TOKEN` is read in server contexts exclusively; a token with write scope should never be used here.

---

## Security Posture

- Gated content is excluded at query time, not hidden at render time
- Write paths run as server actions with authorization checked server-side, not inferred from UI state
- Secrets are server-scoped; the client bundle receives project ID and dataset only
- Dependencies are patched on disclosure rather than on a release cycle — Next.js was moved to 15.5.20 in response to a published advisory

---

## Trade-offs

- **Three external services** — Clerk, Schematic and Sanity each remove code from the repo and add a vendor to the failure surface. For a solo-maintained product that trade favours the vendors; a larger team with billing complexity would likely own entitlement internally.
- **Comments are unmoderated.** The schema captures name, email and body with no spam handling or approval step. Fine at current scale, a problem at any real volume.
- **Entitlement is read on request.** There is no local cache of a user's plan, so every gated render depends on the entitlement provider being reachable. Simple and always-correct, at the cost of a network hop on the critical path.
- **No test coverage on the gating logic.** This is the one place I would add tests first: authorization is exactly the kind of logic where a regression is silent and expensive.

---

## Roadmap

- [ ] Integration tests asserting each tier can reach only its own content
- [ ] Comment moderation queue and rate limiting
- [ ] Short-lived entitlement caching with invalidation on plan change
- [ ] Creator analytics — earnings and engagement per tier

---

## Author

**Syed Laeeq Ahmed** — Full-Stack Lead Engineer @ North Foundry

[Portfolio](https://laeeqthedevportfolio.vercel.app) · [LinkedIn](https://www.linkedin.com/in/syed-laeeq-ahmed/) · [GitHub](https://github.com/LaeeqtheDev) · laeeqthedev@gmail.com

## License

All rights reserved. Source is public to read; not licensed for reuse or redeployment.
