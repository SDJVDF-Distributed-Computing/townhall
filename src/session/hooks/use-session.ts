import useSWR from "swr"
import { sessionService } from "@/src/session/services/session.service"

export function useSession() {
  const { data, isLoading, error, mutate } = useSWR("session:status", () =>
    sessionService.getStatus()
  )
  return { session: data, isLoading, error, mutate }
}
