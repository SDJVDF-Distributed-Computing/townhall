import { Message } from "@/src/message/types/message.type"
import { useUser } from "@/src/identity/hooks/use-user"
import UserAvatar from "@/src/identity/components/user-avatar"
import MessageBlock from "@/src/message/components/message-block"
import TimestampDivider from "@/src/message/components/timestamp-divider"
import { ONE_MINUTE } from "@/src/shared/constants/time"
import { useCurrentUser } from "@/src/identity/hooks/use-current-user"

interface MessageGroupProps {
  messages: Message[]
}

function splitIntoSubgroups(messages: Message[]): Message[][] {
  return messages.reduce<Message[][]>((acc, msg, i) => {
    const prev = messages[i - 1]
    const hasGap = prev ? msg.timestamp - prev.timestamp > ONE_MINUTE : false

    if (hasGap || i === 0) {
      acc.push([msg])
    } else {
      acc[acc.length - 1].push(msg)
    }

    return acc
  }, [])
}

export default function MessageGroup({ messages }: MessageGroupProps) {
  const { user } = useUser(messages[0].user_id)
  const { user: currentUser } = useCurrentUser()
  const isMe = user?.id === currentUser?.id
  const subgroups = splitIntoSubgroups(messages)

  return (
    <>
      {subgroups.map((subgroup, si) => (
        <div key={subgroup[0].id}>
          {si > 0 && <TimestampDivider timestamp={subgroup[0].timestamp} />}

          <div
            className={`flex w-full items-start gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
          >
            <UserAvatar user={user} />

            <div
              className={`flex max-w-[70%] flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}
            >
              <span className="px-1 text-xs font-bold text-muted-foreground">
                {user?.username ?? "..."}
              </span>

              {subgroup.map((msg, i) => (
                <MessageBlock key={msg.id} message={msg} isFirst={i === 0} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
