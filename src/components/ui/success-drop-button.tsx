"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button, buttonVariants } from "./button"

type SuccessDropItem = {
  label: string
  onClick: () => void
}

// A primary success-colored (green) action fused with a chevron toggle that reveals a menu of
// secondary actions below it - e.g. "Save" plus "Save and Copy"/"Save and New". Owns its own
// open/close state, outside-click, and Escape handling so callers just supply the actions.
function SuccessDropButton({
  onClick,
  children = "Save",
  items,
}: {
  onClick: () => void
  children?: React.ReactNode
  items: SuccessDropItem[]
}) {
  const groupRef = React.useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    if (!menuOpen) return
    function handlePointerDown(e: PointerEvent) {
      if (!groupRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  return (
    <div ref={groupRef} className="relative">
      <div className="flex">
        <ButtonPrimitive
          data-slot="button"
          type="button"
          onClick={onClick}
          className={cn(
            buttonVariants({ size: "default" }),
            "rounded-tr-none rounded-br-none border border-[var(--status-green-border)] bg-[var(--status-green-bg)] pr-[37px] text-[var(--status-green-border)] hover:border-[var(--status-green-bg)] hover:bg-[var(--status-green-border)] hover:text-[var(--status-green-bg)]",
            menuOpen
              ? "rounded-bl-none border-r-0 border-b-0 shadow-none"
              : "border-r border-r-[var(--status-green-border)]"
          )}
        >
          {children}
        </ButtonPrimitive>
        <ButtonPrimitive
          data-slot="button"
          type="button"
          aria-label="More save options"
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            buttonVariants({ size: "default" }),
            "rounded-tl-none rounded-bl-none border border-l-0 border-[var(--status-green-border)] bg-[var(--status-green-bg)] px-1.5 text-[var(--status-green-border)] hover:border-[var(--status-green-bg)] hover:bg-[var(--status-green-border)] hover:text-[var(--status-green-bg)]",
            menuOpen && "rounded-br-none border-b-0 shadow-none"
          )}
        >
          <ChevronDown className="size-4" />
        </ButtonPrimitive>
      </div>
      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-md border border-t-0 border-[var(--status-green-border)] bg-[var(--status-green-bg)]">
          {items.map((item) => (
            <Button
              key={item.label}
              type="button"
              variant="text"
              onClick={() => {
                item.onClick()
                setMenuOpen(false)
              }}
              className="h-8 w-full justify-start rounded-none pl-4 text-[var(--status-green-border)] hover:bg-[var(--status-green-border)] hover:text-[var(--status-green-bg)]"
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export { SuccessDropButton }
