import { ApiError } from "@/src/shared/errors/api.error"
import {
  AuthenticatePayload,
  ConnectPayload,
  SessionStatus,
  sessionStatusSchema,
} from "@/src/session/schemas/session.schema"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000"


class SessionService {
  async getStatus(): Promise<SessionStatus> {
    const res = await fetch(`${BASE_URL}/api/session/status`)
    const payload = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, payload?.error ?? "Failed to get session status")
    return sessionStatusSchema.parse(payload)
  }

  async connect(data: ConnectPayload): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/session/connect`, {
      method: "POST",
      body: JSON.stringify({ host: data.host, port: data.port }),
      headers: { "Content-Type": "application/json" },
    })
    const payload = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, payload?.error ?? "Failed to connect")
  }

  async authenticate(data: AuthenticatePayload): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/session/authenticate`, {
      method: "POST",
      body: JSON.stringify({ username: data.username, password: data.password }),
      headers: { "Content-Type": "application/json" },
    })
    const payload = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, payload?.error ?? "Authentication failed")
  }

  async disconnect(): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/session`, { method: "DELETE" })
    const payload = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, payload?.error ?? "Failed to disconnect")
  }
}

export const sessionService = new SessionService()
