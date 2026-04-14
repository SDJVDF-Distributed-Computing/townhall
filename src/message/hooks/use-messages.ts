import useSWR from "swr"
import { messageService } from "@/src/message/services/message.service"

export function useMessages() {
  const { data, isLoading, error, mutate } = useSWR(
    "messages",
    () => messageService.downloadMessages(),
    { revalidateOnFocus: false }
  )
  return { messages: data ?? [], isLoading, error, mutate }
}
