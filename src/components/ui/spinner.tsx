import { cn } from "../../lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(
        "size-9 animate-spin rounded-full border-[3px] border-border border-t-[var(--status-green-border)]",
        className
      )}
      {...props}
    />
  )
}

export { Spinner }
