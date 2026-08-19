# MICROHAX LEAGUE #500 — Render

## Environment variables

Set these in Render:

- `HB_TOKEN` = your HaxBall Headless token
- `DASHBOARD_TOKEN` = a long random admin secret
- `DATABASE_URL` = Render PostgreSQL connection string
- `PORT` = Render provides this automatically; do not hard-code it.

## Build

```bash
npm install
```

## Start

```bash
npm start
```

## Endpoints

- `/` dashboard
- `/health` health check for UptimeRobot
- `/api/health`
- `/api/state`
- `/api/players`
- `/api/ranking`
- `/api/matches`
- `/ws` WebSocket live updates

The dashboard token is only required for POST admin endpoints.
