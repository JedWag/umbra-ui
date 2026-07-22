import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "../lib/utils"

const MONTH_ABBRS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function formatDisplay(value: string) {
  if (!value) return ""
  const [y, m] = value.split("-").map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString(undefined, { year: "numeric", month: "long" })
}

export function MonthField({
  value,
  onChange,
  id,
  placeholder = "Pick a month",
  clearLabel,
}: {
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
  clearLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(() =>
    value ? Number(value.split("-")[0]) : new Date().getFullYear()
  )

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setViewYear(value ? Number(value.split("-")[0]) : new Date().getFullYear())
      }}
    >
      <PopoverTrigger
        render={
          <Button id={id} type="button" variant="outline" className="w-full justify-start font-normal">
            <CalendarIcon className="mr-1 size-4" />
            {value ? formatDisplay(value) : <span className="text-muted-foreground">{placeholder}</span>}
          </Button>
        }
      />
      <PopoverContent className="w-64">
        <div className="flex items-center justify-between px-1 pb-2">
          <Button type="button" variant="text" size="icon" onClick={() => setViewYear((y) => y - 1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium">{viewYear}</span>
          <Button type="button" variant="text" size="icon" onClick={() => setViewYear((y) => y + 1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
        {clearLabel && (
          <Button
            type="button"
            variant="text"
            className={cn("mb-1 w-full justify-center", !value && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground")}
            onClick={() => {
              onChange("")
              setOpen(false)
            }}
          >
            {clearLabel}
          </Button>
        )}
        <div className="grid grid-cols-3 gap-1">
          {MONTH_ABBRS.map((name, i) => {
            const monthValue = `${viewYear}-${String(i + 1).padStart(2, "0")}`
            return (
              <Button
                key={monthValue}
                type="button"
                variant="text"
                className={cn(monthValue === value && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground")}
                onClick={() => {
                  onChange(monthValue)
                  setOpen(false)
                }}
              >
                {name}
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
