import useSWR from "swr"
import { User } from "@/src/identity/schemas/user.schema"
import { identityService } from "@/src/identity/services/identity.service"

export function useCurrentUser() {
  const { data, isLoading, error } = useSWR<User>(`users:me`, () =>
    identityService.getCurrentUser()
  )
  return { user: data, isLoading, error }
}
