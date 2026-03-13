import { SidebarMenuItem } from "@/components/ui/sidebar"
import UserAvatar from "@/src/identity/components/user-avatar"
import { UserStatusIndicator } from "@/src/identity/components/user-status-indicator"
import { User } from "@/src/identity/schemas/user.schema"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <SidebarMenuItem>
      <div className="flex items-center justify-between gap-2 px-2 py-3">
        <div className="flex items-center gap-2">
          <UserAvatar user={user} />
          <span>{user.username}</span>
        </div>
        <div>
          <UserStatusIndicator status={user.status} />
        </div>
      </div>
    </SidebarMenuItem>
  )
}
