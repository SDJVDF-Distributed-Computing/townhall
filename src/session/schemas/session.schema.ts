import z from "zod"

export const sessionStatusSchema = z.object({
  isConnected: z.boolean(),
  isAuthenticated: z.boolean(),
  isClosed: z.boolean(),
})

export const connectPayloadSchema = z.object({
  host: z.string().min(1, "Host is required"),
  port: z.number().int().min(1).max(65535),
})

export const authenticatePayloadSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export type SessionStatus = z.infer<typeof sessionStatusSchema>
export type ConnectPayload = z.infer<typeof connectPayloadSchema>
export type AuthenticatePayload = z.infer<typeof authenticatePayloadSchema>
