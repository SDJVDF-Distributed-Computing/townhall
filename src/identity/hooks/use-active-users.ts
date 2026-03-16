import useSWR from "swr"
import { User } from "@/src/identity/schemas/user.schema"
import { userService } from "@/src/identity/services/user.mock.service"

export function useActiveUsers() {
  const { data, isLoading, error } = useSWR<User[]>("users:active", () =>
    userService.getActiveUsers()
  )

  return { users: data, isLoading, error }
}
