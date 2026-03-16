import { useSWRConfig } from "swr"
import { NewMessagePayload } from "@/src/message/schema/new-message.schema"
import { useCallback } from "react"
import { sendMessage as sendMessageAction } from "@/src/message/services/message.mock.service"

export function useSendMessage() {
  const { mutate } = useSWRConfig()

  const sendMessage = useCallback(
    async (data: NewMessagePayload) => {
      await sendMessageAction(data)
      await mutate("messages")
    },
    [mutate]
  )

  return { sendMessage }
}
