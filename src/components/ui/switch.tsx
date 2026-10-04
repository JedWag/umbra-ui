import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch inline-flex h-5 w-9 shrink-0 items-center p-0.5 rounded-full border border-[var(--status-orange-border)] bg-[var(--status-orange-bg)] shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[var(--status-orange-bg)] hover:bg-[var(--status-orange-border)] data-checked:border-[var(--status-green-border)] data-checked:bg-[var(--status-green-bg)] data-checked:hover:border-[var(--status-green-bg)] data-checked:hover:bg-[var(--status-green-border)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-3.5 rounded-full bg-[var(--status-orange-border)] ring-0 transition-transform translate-x-0 data-checked:translate-x-4 group-hover/switch:bg-[var(--status-orange-bg)] data-checked:bg-[var(--status-green-border)] data-checked:group-hover/switch:bg-[var(--status-green-bg)]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
