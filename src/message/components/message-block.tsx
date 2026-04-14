import { Message } from "@/src/message/types/message.type"

interface MessageBlockProps {
  message: Message
}

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function MessageBlock({ message }: MessageBlockProps) {
  return (
    <div className="flex flex-col gap-1 py-1">
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-muted-foreground">{formatTime(message.receivedAt)}</span>
      </div>
      <div className="rounded-xl bg-secondary px-4 py-2 text-sm leading-relaxed text-secondary-foreground">
        <p>{message.content}</p>
      </div>
    </div>
  )
}
