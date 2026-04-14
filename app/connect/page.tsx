"use client"

import { useSessionGuard } from "@/src/session/hooks/use-session-guard"
import { AuthLayout } from "@/src/session/components/auth-layout"
import { ConnectForm } from "@/src/session/forms/connect.form"

export default function ConnectPage() {
  useSessionGuard("require-disconnected")

  return (
    <AuthLayout subtitle="Connect to a server">
      <ConnectForm />
    </AuthLayout>
  )
}
