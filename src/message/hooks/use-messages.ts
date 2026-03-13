import { MessageResponse } from "@/src/message/schema/message.schema"
import { messageService } from "@/src/message/services/message.service"
import useSWRInfinite from "swr/infinite"

export function useMessages() {
  const { data, isLoading, error } = useSWRInfinite<MessageResponse>(
    (pageIndex, previousPage) => {
      if (previousPage && !previousPage.meta.next_cursor) return null
      return `messages:${previousPage?.meta.next_cursor ?? "start"}`
    },
    (key) => messageService.getMessages(key)
  )

  return { data, isLoading, error }
}
