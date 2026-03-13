import { ApiError } from "@/src/shared/errors/api.error"
import {
  NewMessagePayload,
  NewMessageResponse,
  newMessageResponseSchema,
} from "@/src/message/schema/new-message.schema"
import {
  MessageResponse,
  messageResponseSchema,
} from "@/src/message/schema/message.schema"

class MessageService {
  async sendMessage(data: NewMessagePayload): Promise<NewMessageResponse> {
    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    const payload = await res.json().catch(() => null)

    if (!res.ok) {
      throw new ApiError(res.status, payload?.error ?? "Failed to send message")
    }

    return newMessageResponseSchema.parse(payload)
  }

  async getMessages(
    chatId: number,
    cursor?: string | null
  ): Promise<MessageResponse> {
    const params = new URLSearchParams({ chatId: String(chatId) })
    if (cursor) params.set("cursor", cursor)

    const res = await fetch(`/api/messages?${params}`, {
      credentials: "include",
    })

    const payload = await res.json().catch(() => null)

    if (!res.ok) {
      throw new ApiError(
        res.status,
        payload?.error ?? "Failed to fetch messages"
      )
    }

    return messageResponseSchema.parse(payload)
  }
}

export const messageService = new MessageService()
