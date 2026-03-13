import { useMessages } from "@/src/message/hooks/use-messages"
import TimestampDivider from "@/src/message/components/timestamp-divider"
import MessageGroup from "@/src/message/components/message-group"
import { ONE_MINUTE } from "@/src/shared/constants/time"

export function MessageFeed() {
  const { data } = useMessages()

  const groups = data?.flatMap((page) => page.data) ?? []

  return (
    <div className="flex flex-col gap-3 p-6">
      {groups.map((group, i) => {
        const prevGroup = groups[i - 1]
        const lastPrevTimestamp =
          prevGroup?.messages[prevGroup.messages.length - 1].timestamp
        const showDivider =
          !prevGroup || group.first_timestamp - lastPrevTimestamp > ONE_MINUTE

        return (
          <div key={`${group.user_id}-${group.first_timestamp}`}>
            {showDivider && (
              <TimestampDivider timestamp={group.first_timestamp} />
            )}
            <MessageGroup messages={group.messages} />
          </div>
        )
      })}
    </div>
  )
}
