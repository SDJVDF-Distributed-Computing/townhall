import { Message } from "@/src/message/types/message.type"
import { useCurrentUser } from "@/src/identity/hooks/use-current-user"

interface MessageProps {
  message: Message
  isFirst: boolean
}

export default function MessageBlock({ message, isFirst }: MessageProps) {
  const { user } = useCurrentUser()
  const isMe = message.user_id === user?.id

  const bubbleRadius = isMe
    ? `${isFirst ? "rounded-tl-xl" : "rounded-xl"}`
    : `${isFirst ? "rounded-tr-xl" : "rounded-xl"}`

  return (
    <div
      className={`rounded-b-xl px-4 py-2 text-sm leading-relaxed ${
        isMe
          ? `bg-primary text-primary-foreground ${bubbleRadius}`
          : `bg-secondary text-secondary-foreground ${bubbleRadius}`
      }`}
    >
      <p>{message.text}</p>
    </div>
  )
}
