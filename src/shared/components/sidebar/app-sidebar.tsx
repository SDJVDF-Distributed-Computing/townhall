"use client"

import * as React from "react"

import { UsersList } from "@/src/shared/components/sidebar/users-list"
import { Header } from "@/src/shared/components/sidebar/header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Footer } from "@/src/shared/components/sidebar/footer"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <UsersList/>
      </SidebarContent>
      <SidebarFooter>
        <Footer/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
