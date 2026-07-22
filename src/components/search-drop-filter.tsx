import { useMemo, useRef, useState } from "react"
import { Filter } from "lucide-react"
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command"
import { Input } from "./ui/input"
import { Popover, PopoverContent } from "./ui/popover"

export function SearchDropFilter({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  emptyLabel = "No results found.",
  className,
}: {
  id?: string
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  emptyLabel?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)
  const displayValue = open ? query : (selected?.label ?? "")

  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  )

  function select(next: string) {
    onValueChange(next)
    setQuery("")
    setOpen(false)
  }

  function close() {
    setQuery("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <div
        ref={wrapperRef}
        className="flex items-center gap-1.5 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <Filter />
        <Input
          id={id}
          className={className}
          placeholder={placeholder}
          value={displayValue}
          onFocus={() => {
            setQuery("")
            setOpen(true)
          }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") close()
            if (e.key === "Enter" && filtered.length > 0) select(filtered[0].value)
          }}
        />
      </div>
      <PopoverContent anchor={wrapperRef} className="w-max min-w-56 p-0" initialFocus={false}>
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            {filtered.map((o) => (
              <CommandItem
                key={o.value}
                value={o.value}
                data-checked={o.value === value}
                className="whitespace-nowrap"
                onSelect={() => select(o.value)}
              >
                {o.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
