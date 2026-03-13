import { User, userSchema } from "@/src/identity/schemas/user.schema";

class IdentityService {
  async getCurrentUser(): Promise<User> {
    const res = await fetch(`/api/users/me`);
    const data = await res.json();
    return userSchema.parse(data);
  }
}

export const identityService = new IdentityService();