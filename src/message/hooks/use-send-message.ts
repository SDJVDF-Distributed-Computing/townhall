import { useSWRConfig } from "swr"
import { unstable_serialize } from "swr/infinite"
import { messageService } from "@/src/message/services/message.service"
import { NewMessagePayload } from "@/src/message/schema/new-message.schema"
import {
  MessageGroup,
  MessageResponse,
} from "@/src/message/schema/message.schema"
import { useCurrentUser } from "@/src/identity/hooks/use-current-user"

const getKey = (pageIndex: number, previousPage: MessageResponse | null) => {
  if (previousPage && !previousPage.meta.next_cursor) return null
  return `messages:${previousPage?.meta.next_cursor ?? "start"}`
}

export function useSendMessage() {
  const { mutate } = useSWRConfig()
  const { user: currentUser } = useCurrentUser()

  async function sendMessage(data: NewMessagePayload) {
    const now = Date.now()
    const optimisticMessage = {
      id: now,
      user_id: currentUser!.id,
      text: data.text,
      timestamp: now,
    }

    await mutate(
      unstable_serialize(getKey),
      async (current: MessageResponse[] | undefined) => {
        await messageService.sendMessage(data)
        return current
      },
      {
        optimisticData: (current: MessageResponse[] | undefined) => {
          const optimisticGroup: MessageGroup = {
            user_id: currentUser!.id,
            first_timestamp: now,
            messages: [optimisticMessage],
          }

          if (!current?.length) {
            return [
              {
                data: [optimisticGroup],
                meta: { total: 1, next_cursor: null },
              },
            ]
          }

          const pages = [...current]
          const lastPage = { ...pages[pages.length - 1] }
          const lastGroup = lastPage.data[lastPage.data.length - 1]

          if (lastGroup?.user_id === currentUser!.id) {
            lastPage.data = [
              ...lastPage.data.slice(0, -1),
              {
                ...lastGroup,
                messages: [...lastGroup.messages, optimisticMessage],
              },
            ]
          } else {
            lastPage.data = [...lastPage.data, optimisticGroup]
          }

          pages[pages.length - 1] = lastPage
          return pages
        },
        revalidate: true,
        rollbackOnError: true,
      }
    )
  }

  return { sendMessage }
}
