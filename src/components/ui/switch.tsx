import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-[var(--status-orange-border)] bg-[var(--status-orange-bg)] shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-[var(--status-green-border)] data-checked:bg-[var(--status-green-bg)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-[var(--status-orange-border)] ring-0 transition-transform translate-x-0 data-checked:translate-x-[calc(100%-2px)] data-checked:bg-[var(--status-green-border)]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
