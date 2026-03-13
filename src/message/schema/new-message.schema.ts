import * as z from "zod"
import { messageSchema } from "@/src/message/types/message.type"

export const newMessageSchema = z.object({
  text: z
    .string()
    .min(1, "Message cannot be empty")
    .max(280, "Message cannot exceed 280 characters"),
})

export const newMessageResponseSchema = z.object({
  message: messageSchema,
})

export type NewMessagePayload = z.infer<typeof newMessageSchema>
export type NewMessageResponse = z.infer<typeof newMessageResponseSchema>
