import type { ReactNode } from "react"
import { Settings as SettingsIcon } from "lucide-react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"
import { IconButton } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"

/**
 * The standard page shell: sidebar + rounded floating header/content panel.
 * See docs/02-ui.md "Project UI Structure" for the rationale.
 *
 * ThemeToggle + a Settings button are always present (identical in every consuming app) -
 * onSettingsClick wires the Settings button, headerActions is purely for app-specific extras
 * (e.g. qb's Upload Data button), rendered before the two standard ones.
 */
export function AppShell({
  sidebar,
  headerActions,
  onSettingsClick,
  children,
}: {
  sidebar: ReactNode
  headerActions?: ReactNode
  onSettingsClick: () => void
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      {sidebar}
      <SidebarInset className="h-svh overflow-hidden md:h-[calc(100svh-1rem)]">
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 md:rounded-tl-xl md:rounded-tr-xl">
          <div className="flex items-center gap-1 lg:gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-2 h-4 data-[orientation=vertical]:self-auto" />
          </div>
          <div className="flex items-center gap-1">
            {headerActions}
            <IconButton aria-label="Settings" onClick={onSettingsClick}>
              <SettingsIcon />
            </IconButton>
            <ThemeToggle />
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto bg-muted/40 p-6 [scrollbar-gutter:stable] [&::-webkit-scrollbar-track]:bg-transparent">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
