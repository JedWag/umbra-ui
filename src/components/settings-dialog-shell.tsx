import type { ComponentType, ReactNode } from "react"

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export type SettingsTab = {
  value: string
  label: string
  icon: ComponentType<{ className?: string }>
  content: ReactNode
}

/**
 * Full tabbed settings dialog: sizing/positioning, the tab ribbon, and the
 * Cancel/Save footer are all baked in - apps supply tab content and two
 * handlers, nothing else. Wrap each tab's content in SettingsTabSection.
 * See docs/DESIGN-SYSTEM.md "Settings dialog (tabbed ribbon)".
 */
export function SettingsDialogShell({
  open,
  onOpenChange,
  tabs,
  defaultTab,
  onCancel,
  onSave,
  saveDisabled,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  tabs: SettingsTab[]
  defaultTab?: string
  onCancel: () => void
  onSave: () => void
  saveDisabled?: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[15%] left-[50%] flex max-h-[80vh] w-full translate-x-[-50%] translate-y-0 flex-col overflow-hidden sm:max-w-4xl">
        <DialogHeader className="shrink-0">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab ?? tabs[0]?.value} className="flex min-h-0 w-full flex-1 flex-col">
          <TabsList className="flex h-11 w-full justify-start sm:h-9">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex shrink-0 items-center gap-1.5">
                <tab.icon className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>

        <DialogActions onCancel={onCancel} onSave={onSave} saveDisabled={saveDisabled} />
      </DialogContent>
    </Dialog>
  )
}
