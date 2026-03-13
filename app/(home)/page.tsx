"use client"
import { AppSidebar } from "@/src/shared/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MessageFeed } from "@/src/message/components/message-feed"
import { NewChatForm } from "@/src/message/form/new-chat.form"
import { Header } from "@/src/shared/components/header/header"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="block">
        <div className="flex h-svh flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <MessageFeed />
          </main>
          <footer className="shrink-0 border-t p-4">
            <NewChatForm />
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
