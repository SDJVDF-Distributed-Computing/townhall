"use client"

import { useRef, useEffect } from "react"
import { useMessages } from "@/src/message/hooks/use-messages"
import MessageBlock from "@/src/message/components/message-block"

export function MessageFeed() {
  const { messages, isLoading, mutate } = useMessages()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end border-b px-6 py-2">
        <button
          onClick={() => mutate()}
          disabled={isLoading}
          className="text-xs text-muted-foreground underline-offset-2 hover:underline disabled:opacity-50"
        >
          {isLoading ? "Fetching…" : "Fetch from server"}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-6">
        {!isLoading && messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No messages yet.</p>
        )}
        {messages.map((msg) => (
          <MessageBlock key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
