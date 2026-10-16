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
  const menuId = React.useId()
  const groupRef = React.useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [saveHovered, setSaveHovered] = React.useState(false)
  const [chevronHovered, setChevronHovered] = React.useState(false)
  const merged = menuOpen || saveHovered

  React.useEffect(() => {
    if (!menuOpen) return
    // Consume the outside gesture before the enclosing dialog or another control sees it.
    function handleOutside(e: PointerEvent | MouseEvent) {
      if (groupRef.current?.contains(e.target as Node)) return
      e.preventDefault()
      e.stopImmediatePropagation()
      if (e.type === "click") setMenuOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return
      e.preventDefault()
      e.stopImmediatePropagation()
      setMenuOpen(false)
    }
    window.addEventListener("pointerdown", handleOutside, true)
    window.addEventListener("click", handleOutside, true)
    window.addEventListener("keydown", handleKeyDown, true)
    return () => {
      window.removeEventListener("pointerdown", handleOutside, true)
      window.removeEventListener("click", handleOutside, true)
      window.removeEventListener("keydown", handleKeyDown, true)
    }
  }, [menuOpen])

  return (
    <div ref={groupRef} className="relative">
      <div
        onPointerLeave={() => setSaveHovered(false)}
        data-menu-open={menuOpen || undefined}
        data-save-hovered={saveHovered || undefined}
        data-chevron-hovered={(!merged && chevronHovered) || undefined}
        className={cn(
          "success-drop-frame relative h-9 rounded-md border border-transparent",
          menuOpen && "rounded-b-none"
        )}
      >
        <ButtonPrimitive
          data-slot="button"
          type="button"
          onPointerEnter={() => setSaveHovered(true)}
          onPointerLeave={() => setSaveHovered(false)}
          onClick={() => {
            setMenuOpen(false)
            onClick()
          }}
          className={cn(
            buttonVariants({ size: "default" }),
            "h-full w-full justify-start rounded-[inherit] bg-transparent pr-[77px] text-[var(--status-green-border)] hover:bg-transparent hover:text-[var(--status-green-bg)]"
          )}
        >
          {children}
        </ButtonPrimitive>
        <ButtonPrimitive
          data-slot="button"
          type="button"
          aria-label="More save options"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? menuId : undefined}
          aria-hidden={menuOpen || undefined}
          tabIndex={menuOpen ? -1 : 0}
          onPointerEnter={() => setChevronHovered(true)}
          onPointerLeave={() => setChevronHovered(false)}
          onClick={() => setMenuOpen(true)}
          className={cn(
            buttonVariants({ size: "default" }),
            "absolute inset-y-0 right-0 h-full w-10 rounded-none rounded-r-[inherit] border-l border-[var(--status-green-border)] bg-transparent px-0 text-[var(--status-green-border)] hover:border-[var(--status-green-bg)] hover:bg-transparent hover:text-[var(--status-green-bg)]",
            merged && "opacity-0",
            menuOpen && "pointer-events-none"
          )}
        >
          <ChevronDown className="size-4" />
        </ButtonPrimitive>
      </div>
      {menuOpen && (
        <div id={menuId} className="absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-md border border-t-0 border-[var(--status-green-border)] bg-[var(--status-green-bg)]">
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
