"use client"

import { useSessionGuard } from "@/src/session/hooks/use-session-guard"
import { AuthLayout } from "@/src/session/components/auth-layout"
import { AuthenticateForm } from "@/src/session/forms/authenticate.form"

export default function LoginPage() {
  useSessionGuard("require-connected")

  return (
    <AuthLayout subtitle="Sign in">
      <AuthenticateForm />
    </AuthLayout>
  )
}
