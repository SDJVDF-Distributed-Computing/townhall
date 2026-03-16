import { User, userSchema } from "@/src/identity/schemas/user.schema"

import {
  LoginPayload,
  LoginResponse,
  loginResponseSchema,
} from "@/src/identity/schemas/login.schema"
import { ApiError } from "@/src/shared/errors/api.error"

class IdentityService {
  async getCurrentUser(): Promise<User> {
    const res = await fetch(`/api/users/me`)
    const data = await res.json()
    return userSchema.parse(data)
  }

  async loginUser(credentials: LoginPayload): Promise<LoginResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    const payload = await res.json().catch(() => null)

    if (!res.ok) {
      throw new ApiError(res.status, payload?.error ?? "Authentication failed")
    }

    return loginResponseSchema.parse(payload)
  }

  async logoutUser(): Promise<void> {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    if (!res.ok) {
      const payload = await res.json().catch(() => null)
      throw new ApiError(res.status, payload?.error ?? "Logout failed")
    }
  }
}

export const identityService = new IdentityService()
