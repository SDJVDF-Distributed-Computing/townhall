import { useSWRConfig } from "swr"
import { NewMessagePayload } from "@/src/message/schema/new-message.schema"
import { useCallback } from "react"
import { messageService } from "@/src/message/services/message.service"

export function useSendMessage() {
  const { mutate } = useSWRConfig()

  const sendMessage = useCallback(async (data: NewMessagePayload) => {
    await messageService.sendMessage(data)
    await mutate("messages")
  }, [mutate])

  return { sendMessage }
}
