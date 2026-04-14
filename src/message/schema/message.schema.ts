import z from "zod"
import { messageSchema } from "@/src/message/types/message.type"

export const messageListSchema = z.array(messageSchema)

export type MessageList = z.infer<typeof messageListSchema>
