import z from "zod"
import { messageSchema } from "@/src/message/types/message.type"

export const messageGroupSchema = z.object({
  user_id: z.number(),
  messages: z.array(messageSchema),
  first_timestamp: z.number(),
})

export const messageResponseSchema = z.object({
  data: z.array(messageGroupSchema),
  meta: z.object({
    total: z.number(),
    next_cursor: z.string().nullable(),
  }),
})

export type MessageGroup = z.infer<typeof messageGroupSchema>
export type MessageResponse = z.infer<typeof messageResponseSchema>
