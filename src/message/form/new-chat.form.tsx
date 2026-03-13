import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  NewMessagePayload,
  newMessageSchema,
} from "@/src/message/schema/new-message.schema"
import { useSendMessage } from "@/src/message/hooks/use-send-message"
import { toast } from "sonner"
import { ApiError } from "@/src/shared/errors/api.error"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SpinnerIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react"

export function NewChatForm() {
  const { sendMessage } = useSendMessage()

  const form = useForm<NewMessagePayload>({
    resolver: zodResolver(newMessageSchema),
    defaultValues: { text: "" },
  })

  async function onSubmit(data: NewMessagePayload) {
    try {
      await sendMessage(data)
      form.reset()
    } catch (e) {
      if (e instanceof ApiError) {
        switch (e.status) {
          case 401:
            toast.error("Not Authenticated", {
              description: "You are not signed in.",
            })
            break
          case 400:
            toast.error("Invalid Message", {
              description: "Message is empty or exceeds 280 characters.",
            })
            break
          default:
            toast.error("Something went wrong", {
              description: "Please try again later.",
            })
        }
        return
      }
      toast.error("Something went wrong", {
        description: "Please try again later.",
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="message" className="sr-only">
                Message
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="message"
                  data-slot="input-group-control"
                  placeholder="Send a message..."
                  className="rounded-lg px-6 py-6"
                  aria-invalid={!!fieldState.error}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      form.handleSubmit(onSubmit)()
                    }
                  }}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    disabled={isSubmitting}
                    className="ml-auto rounded-sm px-2 py-1"
                    type="submit"
                    size="sm"
                    variant="default"
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerIcon className="animate-spin" />
                        <span className="sr-only">Sending</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneTiltIcon />
                        <span className="sr-only">Send</span>
                      </>
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
