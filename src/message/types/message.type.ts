import z from "zod"

export const messageSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  receivedAt: z.string().datetime(),
})

export type Message = z.infer<typeof messageSchema>
