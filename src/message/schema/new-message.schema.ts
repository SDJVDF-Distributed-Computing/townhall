import * as z from "zod"

export const newMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message cannot exceed 1000 characters"),
})

export type NewMessagePayload = z.infer<typeof newMessageSchema>
