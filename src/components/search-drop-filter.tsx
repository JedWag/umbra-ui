import { useState } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Filter } from "lucide-react"
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

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
  const selected = options.find((o) => o.value === value)

  function select(next: string) {
    onValueChange(next)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command className="overflow-visible bg-transparent p-0">
        <PopoverTrigger
          nativeButton={false}
          render={
            <div className="flex items-center gap-1.5 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <Filter />
              <CommandPrimitive.Input asChild>
                <Input
                  key={value}
                  id={id}
                  className={className}
                  placeholder={placeholder}
                  defaultValue={selected?.label ?? ""}
                />
              </CommandPrimitive.Input>
            </div>
          }
        />
        <PopoverContent className="w-max min-w-56 p-0">
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            {options.map((o) => (
              <CommandItem
                key={o.value}
                value={o.label}
                data-checked={o.value === value}
                className="whitespace-nowrap"
                onSelect={() => select(o.value)}
              >
                {o.label}
              </CommandItem>
            ))}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  )
}
