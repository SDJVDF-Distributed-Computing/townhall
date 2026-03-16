import useSWR from "swr"
import { getMessages } from "@/src/message/services/message.mock.service"

export function useMessages() {
  const { data, isLoading, error } = useSWR("messages", () => getMessages())

  return { data, isLoading, error }
}
