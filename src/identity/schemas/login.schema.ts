import z from "zod"

export const loginPayloadSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const loginResponseSchema = z.object({
  token: z.string(),
})

export type LoginPayload = z.infer<typeof loginPayloadSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
