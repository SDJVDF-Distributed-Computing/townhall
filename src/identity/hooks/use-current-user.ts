import useSWR from "swr"
import { User } from "@/src/identity/schemas/user.schema"
import { getCurrentUser } from "@/src/identity/services/identity.mock.service"

export function useCurrentUser() {
  const { data, isLoading, error } = useSWR<User>(`users:me`, () =>
    getCurrentUser()
  )
  return { user: data, isLoading, error }
}
