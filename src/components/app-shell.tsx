import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"

/**
 * The standard page shell: sidebar + rounded floating header/content panel.
 * See docs/DESIGN-SYSTEM.md "Layout structure" for the rationale.
 */
export function AppShell({
  sidebar,
  headerActions,
  children,
}: {
  sidebar: ReactNode
  headerActions?: ReactNode
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      {sidebar}
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-4 md:rounded-tl-xl md:rounded-tr-xl">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
          </div>
          {headerActions && <div className="flex items-center gap-1">{headerActions}</div>}
        </header>
        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
