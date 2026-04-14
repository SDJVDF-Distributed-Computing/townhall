"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { sessionService } from "@/src/session/services/session.service"
import { ConnectPayload, connectPayloadSchema } from "@/src/session/schemas/session.schema"
import { ApiError } from "@/src/shared/errors/api.error"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ConnectForm() {
  const router = useRouter()

  const form = useForm<ConnectPayload>({
    resolver: zodResolver(connectPayloadSchema),
    defaultValues: { host: "localhost", port: 8443 },
  })

  async function onSubmit(data: ConnectPayload) {
    try {
      await sessionService.connect(data)
      router.push("/login")
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Failed to connect"
      toast.error("Connection failed", { description: msg })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="host"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="host">Host</FieldLabel>
            <Input {...field} id="host" aria-invalid={fieldState.invalid} placeholder="localhost" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="port"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="port">Port</FieldLabel>
            <Input
              {...field}
              id="port"
              type="number"
              aria-invalid={fieldState.invalid}
              placeholder="8443"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Connecting…" : "Connect"}
      </Button>
    </form>
  )
}
