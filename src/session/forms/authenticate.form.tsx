"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { sessionService } from "@/src/session/services/session.service"
import { AuthenticatePayload, authenticatePayloadSchema } from "@/src/session/schemas/session.schema"
import { ApiError } from "@/src/shared/errors/api.error"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AuthenticateForm() {
  const router = useRouter()

  const form = useForm<AuthenticatePayload>({
    resolver: zodResolver(authenticatePayloadSchema),
    defaultValues: { username: "", password: "" },
  })

  async function onSubmit(data: AuthenticatePayload) {
    try {
      await sessionService.authenticate(data)
      router.push("/")
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        toast.error("Invalid credentials", { description: "Check your username and password." })
      } else {
        toast.error("Authentication failed", { description: "Please try again." })
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input {...field} id="username" aria-invalid={fieldState.invalid} placeholder="alice" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...field}
              id="password"
              type="password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
