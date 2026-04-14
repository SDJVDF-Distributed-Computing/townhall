import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/src/identity/schemas/user.schema"

interface UserAvatarProps {
  user?: User
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar className="h-8 w-8 shrink-0 rounded-lg">
      <AvatarImage src={user?.avatar_url} alt={user?.username} />
      <AvatarFallback className="rounded-lg">
        {user?.username?.slice(0, 2).toUpperCase() ?? "??"}
      </AvatarFallback>
    </Avatar>
  )
}
