"use client"

import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { logoutUser } from "@/src/identity/services/identity.mock.service"
import { SignOutIcon, SpinnerGapIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

export function Footer() {
  const router = useRouter()

  const { open } = useSidebar()
  const [isLoading, setIsLoading] = useState(false)

  async function onLogout() {
    setIsLoading(true)
    try {
      await logoutUser()
      router.push("/login")
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Button
            size={open ? "lg" : "icon"}
            variant="default"
            onClick={onLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerGapIcon className="animate-spin" />
            ) : (
              <SignOutIcon />
            )}
            <span className={open ? "not-sr-only" : "sr-only"}>
              {isLoading ? "Logging out..." : "Logout"}
            </span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
