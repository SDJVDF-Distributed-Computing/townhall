"use client"

import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SignOutIcon } from "@phosphor-icons/react"

export function Footer() {
  const { open } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Button size={`${open ? "lg" : "icon"}`}>
            <SignOutIcon />
            <span className={`${open ? "not-sr-only" : "sr-only"}`}>
              Logout
            </span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
