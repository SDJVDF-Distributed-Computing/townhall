import z from "zod"
import { User, userSchema } from "@/src/identity/schemas/user.schema"

class UserService {
  async getUser(id: number): Promise<User> {
    const res = await fetch(`/api/users/${id}`)
    const data = await res.json()
    return userSchema.parse(data)
  }

  async getActiveUsers(): Promise<User[]> {
    const res = await fetch("/api/users/active")
    const data = await res.json()
    return z.array(userSchema).parse(data)
  }
}
export const userService = new UserService()
