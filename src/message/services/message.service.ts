import { ApiError } from "@/src/shared/errors/api.error"
import { NewMessagePayload } from "@/src/message/schema/new-message.schema"
import { Message, messageSchema } from "@/src/message/types/message.type"
import z from "zod"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000"

class MessageService {
  async sendMessage(data: NewMessagePayload): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/messages`, {
      method: "POST",
      body: JSON.stringify({ content: data.content }),
      headers: { "Content-Type": "application/json" },
    })
    const payload = await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, payload?.error ?? "Failed to send message")
  }

  async downloadMessages(): Promise<Message[]> {
    const res = await fetch(`${BASE_URL}/api/messages/download`, { method: "POST" })
    const payload = await res.json().catch(() => null)

    if (!res.ok) throw new ApiError(res.status, payload?.error ?? "Failed to download messages")
    return z.array(messageSchema).parse(payload)
  }
}

export const messageService = new MessageService()
