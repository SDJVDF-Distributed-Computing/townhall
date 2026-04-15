"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/src/session/hooks/use-session"

export function SessionInfo() {
  const { session, isLoading } = useSession()

  if (isLoading || !session) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Session</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex flex-col gap-1 px-2 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${session.isConnected ? "bg-green-500" : "bg-destructive"}`}
              />
              <span>{session.isConnected ? "Connected" : "Disconnected"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${session.isAuthenticated ? "bg-green-500" : "bg-yellow-500"}`}
              />
              <span>{session.isAuthenticated ? "Authenticated" : "Not authenticated"}</span>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
