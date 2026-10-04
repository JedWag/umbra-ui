import { useState } from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"

// The four colors every switch is built from. Hover swaps each part to the opposite
// position's color, so re-theming the switch means changing only these four.
const SWITCH_COLORS = [
  "[--switch-track-off:var(--input)] dark:[--switch-track-off:color-mix(in_oklab,var(--input)_80%,transparent)]",
  "[--switch-track-on:var(--primary)]",
  "[--switch-thumb-off:var(--background)] dark:[--switch-thumb-off:var(--foreground)]",
  "[--switch-thumb-on:var(--background)] dark:[--switch-thumb-on:var(--primary-foreground)]",
]

const TRACK_HOVER =
  "hover:bg-[var(--switch-track-on)] data-checked:hover:bg-[var(--switch-track-off)]"
const THUMB_HOVER =
  "group-hover/switch:bg-[var(--switch-thumb-on)] data-checked:group-hover/switch:bg-[var(--switch-thumb-off)]"

function Switch({ className, onClick, onPointerLeave, ...props }: SwitchPrimitive.Root.Props) {
  // hover preview is paused after a click until the pointer leaves, so the switch doesn't flip back to the old colors under the cursor
  const [clicked, setClicked] = useState(false)

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent p-0.5 shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        SWITCH_COLORS,
        "bg-[var(--switch-track-off)] data-checked:bg-[var(--switch-track-on)]",
        !clicked && TRACK_HOVER,
        className
      )}
      onClick={(event) => {
        setClicked(true)
        onClick?.(event)
      }}
      onPointerLeave={(event) => {
        setClicked(false)
        onPointerLeave?.(event)
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-3.5 translate-x-0 rounded-full ring-0 transition-transform data-checked:translate-x-4 bg-[var(--switch-thumb-off)] data-checked:bg-[var(--switch-thumb-on)]",
          !clicked && THUMB_HOVER
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
