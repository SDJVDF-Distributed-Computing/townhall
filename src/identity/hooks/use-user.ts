import useSWR from "swr"
import { User } from "@/src/identity/schemas/user.schema"
import { userService } from "@/src/identity/services/user.service"

export function useUser(userId: number) {
  const { data, error, isLoading } = useSWR<User>(`users:${userId}`, () =>
    userService.getUser(userId)
  )

  return { user: data, isLoading, error }
}
