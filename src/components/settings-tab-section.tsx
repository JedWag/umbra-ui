import type { ReactNode } from "react"

/**
 * Section header (title + action button) over a scrollable content area, used
 * inside each TabsContent of a tabbed settings dialog. See
 * docs/DESIGN-SYSTEM.md "Settings dialog (tabbed ribbon)".
 */
export function SettingsTabSection({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <div className="flex shrink-0 items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        {action}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
