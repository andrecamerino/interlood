# Interlood — Project Map

> Read `AGENTS.md` first for persona, standards, and workflow rules. This file is the project map: what exists, why it exists, and how to run it.

## Project Vision

Interlood is a real-time, multiplayer party-game web app where players join a shared room from their own devices and play together. The first game is Wavelength, with more game modes planned behind a unified room/lobby system.

## Project Structure

This is a pnpm workspace monorepo with three packages: `frontend`, `backend`, and `shared`.

```
interlood/
├── frontend/                 # Next.js 16 App Router client
│   ├── app/
│   │   ├── page.tsx          # Landing / lobby entry
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── room/
│   │   │   ├── page.tsx
│   │   │   └── [roomId]/page.tsx
│   │   └── wavelength/
│   │       ├── page.tsx
│   │       └── ui/GameUI.tsx
│   ├── components/           # JoinRoom, Room, ...
│   ├── lib/socket.ts         # socket.io-client singleton
│   └── next.config.ts
│
├── backend/                  # Express + Socket.IO server (tsx)
│   ├── index.ts              # HTTP + Socket.IO bootstrap (port 3002)
│   ├── SocketManager.ts      # Top-level socket event router
│   ├── models/
│   │   ├── Room.ts
│   │   ├── RoomManager.ts
│   │   └── wavelength/       # WavelengthRoom, WavelengthGame, WavelengthPlayer
│   ├── logic/gameLogic.ts
│   ├── data/categories.ts
│   └── utils/                # getRandom, normaliseString, time
│
├── shared/                   # Cross-package types & models (path alias @shared/*)
│   ├── models/               # Player, Host, User
│   └── types/                # GameType, RoomPhase, wavelength/*
│
├── package.json              # Workspace root scripts
├── pnpm-workspace.yaml
└── tsconfig.json             # Root paths config (@shared/*)
```

## Tech Stack

**Frontend**
- Next.js 16.2.1 (App Router)
- React 19.2
- Tailwind CSS 4 (PostCSS plugin)
- TypeScript 5
- `socket.io-client` 4.8

**Backend**
- Node.js + Express 4
- Socket.IO 4.8 (real-time room state)
- TypeScript via `tsx` (no build step in dev)

**Shared / Tooling**
- pnpm workspaces
- ESLint 9 + `eslint-config-next`
- TypeScript path alias `@shared/*` → `./shared/*`
- Deployed on Vercel (frontend); backend host TBD

## Development Workflow

**Default branch:** `staging` (integration). `main` is production-only.

**Branch naming:**
- `feature/<short-description>` — new functionality
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling, deps, config, non-user-facing
- `docs/<short-description>` — documentation only

**Flow:**
1. Branch off `staging`.
2. Open a PR into `staging` when work is ready for review.
3. Once `staging` is verified, open a PR from `staging` → `main` to release.
4. Merging to `main` triggers the production deploy on Vercel.

Do not commit directly to `staging` or `main`. Do not open PRs that target `main` from a feature branch — go through `staging`.

## Roadmap

**Current Status**
- Workspace + Next.js 16 / Express + Socket.IO scaffolding in place.
- Basic room lifecycle wired: create room, join room by id, host/player model, broadcast `room updated`.
- Wavelength stub exists (`backend/models/wavelength`, `frontend/app/wavelength`) — not yet playable end-to-end.

**Immediate Todo**
- Game selection: let the host pick a game from the lobby and route players into the correct game UI.
- Wire Wavelength game phases through `RoomPhase` / `WavelengthGamePhases` and broadcast state transitions.
- Frontend overhaul: replace placeholder landing/lobby UI with the redesign.

**Future Features**
- Additional games beyond Wavelength behind the same room abstraction.
- Automated deployment pipelines (preview env on PRs to `staging`, production deploy on `main`).
- Persistent player identity / reconnect handling across socket disconnects.

## The "Why" Log

Record decisions here when the reasoning isn't obvious from the code. Each entry: date, decision, why.

- **2026-04 — Monorepo with `shared/` package, not duplicated types.** The same `Player`, `Host`, `RoomPhase`, and game-state shapes cross the socket boundary. A single source of truth (`@shared/*`) prevents client/server drift.
- **2026-04 — Backend uses `tsx` directly instead of a build step.** The backend is small and iteration speed matters more than startup cost right now. Revisit if we need a real production deploy target.
- **2026-04 — Socket.IO over plain WebSocket.** Rooms, broadcasts, and reconnection are first-class in Socket.IO and we'd otherwise rebuild them.

## Known Gotchas

- **Next.js 16 has breaking changes vs. older training data.** APIs, conventions, and file structure may differ from what an LLM "knows." Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.
- **Two Socket.IO servers are instantiated in `backend/index.ts`.** `new SocketManager(io)` is called twice — likely a bug. Fix before adding more socket handlers, otherwise events fire twice.
- **Backend CORS is hard-coded to `http://localhost:3000`.** Anything other than the local frontend origin will be rejected. Make this env-driven before deploying.
- **Backend port is hard-coded to `3002` and not env-driven.** Frontend `lib/socket.ts` must match.
- **`pnpm dev` runs frontend and backend with `&`**, not a proper process manager — output is interleaved and Ctrl-C may not kill both. Use two terminals if debugging.
- **No tests yet.** Don't claim "verified" without manually running both servers and exercising the flow in the browser.

## Environment Setup

Requires Node.js (LTS) and pnpm.

```bash
# install all workspace deps
pnpm install

# run frontend (http://localhost:3000) and backend (http://localhost:3002) together
pnpm dev

# or run them individually (preferred for clean logs)
pnpm dev:frontend
pnpm dev:backend

# build
pnpm build
```

There is no `.env` schema yet — none of the current code reads from `process.env`. When the first env var is introduced, add a `.env.example` and document it in this section.
