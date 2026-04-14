interface TimestampDividerProps {
  timestamp: number
}

function formatTimeDivider(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function TimestampDivider({ timestamp }: TimestampDividerProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">
        {formatTimeDivider(timestamp)}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
