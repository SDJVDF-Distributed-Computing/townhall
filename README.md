# Townhall

A distributed messaging frontend built with Next.js, connecting to a backend over the SMP protocol.

## Stack

- **Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend** — ASP.NET Core REST API (`ghcr.io/sdjvdf-distributed-computing/backend`)
- **SMP Server** — Echo server handling the messaging protocol (`ghcr.io/sdjvdf-distributed-computing/echo-server`)

## Local development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with Compose v2
- [Node.js 22+](https://nodejs.org/) (for running the frontend outside Docker)

### Start dependent services

```bash
docker compose up
```

This starts `smp-server` and `backend` in the correct order:

1. `smp-server` starts and generates a TLS certificate into the `smp-certs` volume
2. `backend` waits until `smp-server` is healthy, then starts using the shared cert

| Service    | Host address          |
|------------|-----------------------|
| Backend API | `http://localhost:1234` |
| SMP Server  | internal only         |

### Start the frontend

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` and talks to the backend at `http://localhost:1234`.

To override the backend URL:

```bash
BACKEND_URL=http://localhost:1234 npm run dev
```

## Docker image

A production image is built and pushed to `ghcr.io/sdjvdf-distributed-computing/townhall` on every push to `main` via GitHub Actions.

Tags produced:

| Tag | When |
|-----|------|
| `latest` | push to `main` |
| `main` | push to `main` |
| `sha-<short-sha>` | every push |

### Build the image locally

```bash
docker build --target runner -t townhall .
docker run -p 3000:3000 -e BACKEND_URL=http://localhost:1234 townhall
```

## Project structure

```
app/          Next.js App Router pages
src/
  message/    Messaging feature (components, hooks, services)
  session/    Session & auth (connect, authenticate, guards)
  identity/   User identity (avatar, status)
  shared/     Sidebar, header, shared utilities
components/
  ui/         shadcn/ui component library
```
