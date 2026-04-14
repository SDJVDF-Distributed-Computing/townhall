"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/src/session/hooks/use-session"

type Rule = "require-disconnected" | "require-connected" | "require-authenticated"

export function useSessionGuard(rule: Rule) {
  const { session, isLoading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (isLoading || !session) return
    switch (rule) {
      case "require-disconnected":
        if (session.isAuthenticated) router.push("/")
        else if (session.isConnected) router.push("/login")
        break
      case "require-connected":
        if (session.isAuthenticated) router.push("/")
        else if (!session.isConnected) router.push("/connect")
        break
      case "require-authenticated":
        if (!session.isConnected) router.push("/connect")
        else if (!session.isAuthenticated) router.push("/login")
        break
    }
  }, [session, isLoading, router, rule])

  return { isLoading, session }
}
