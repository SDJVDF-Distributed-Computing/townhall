# Townhall

A distributed messaging frontend built with Next.js, connecting to a backend over the SMP protocol.

## Stack

- **Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend** — ASP.NET Core REST API (`ghcr.io/sdjvdf-distributed-computing/backend`)
- **SMP Server** — Echo server handling the messaging protocol (`ghcr.io/sdjvdf-distributed-computing/echo-server`)

## Local development

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- Backend running (see above)

### Start the frontend

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` and talks to the backend at `http://localhost:1234` by default.

To override the backend URL:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:1234 npm run dev
```

## Docker image

A production image is built and pushed to `ghcr.io/sdjvdf-distributed-computing/townhall` on every push to `main` via GitHub Actions.

`NEXT_PUBLIC_BACKEND_URL` is a build-time variable baked into the image. It is set via the `NEXT_PUBLIC_BACKEND_URL` repository variable in GitHub Actions (**Settings → Secrets and variables → Actions → Variables**).

Tags produced:

| Tag | When |
|-----|------|
| `latest` | push to `main` |
| `main` | push to `main` |
| `sha-<short-sha>` | every push |

### Build the image locally

```bash
docker build --target runner --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:1234 -t townhall .
docker run -p 3000:3000 townhall
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
