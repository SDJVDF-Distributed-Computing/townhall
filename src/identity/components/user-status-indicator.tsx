import { User } from "@/src/identity/schemas/user.schema"

const statusStyles: Record<string, string> = {
  Online: "bg-green-500",
  Away: "bg-yellow-500",
  Offline: "bg-destructive",
}

interface UserStatusIndicatorProps {
  status: User["status"]
}

export function UserStatusIndicator({ status }: UserStatusIndicatorProps) {
  return (
    <div className={`${statusStyles[status]} h-2 w-2 rounded-full border`}>
      <span className="sr-only">{status}</span>
    </div>
  )
}
