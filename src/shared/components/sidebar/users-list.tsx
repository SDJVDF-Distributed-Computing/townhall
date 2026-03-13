"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { useActiveUsers } from "@/src/identity/hooks/use-active-users"
import { UserCard } from "@/src/shared/components/sidebar/user-card"

export function UsersList() {
  const { users, isLoading } = useActiveUsers()

  if (isLoading) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Users</SidebarGroupLabel>
      <SidebarMenu>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
