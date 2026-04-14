import { WindmillIcon } from "@phosphor-icons/react"

interface AuthLayoutProps {
  subtitle: string
  children: React.ReactNode
}

export function AuthLayout({ subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <WindmillIcon className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">Townhall</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
