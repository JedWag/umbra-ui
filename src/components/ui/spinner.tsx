import { cn } from "../../lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(
        "size-[72px] animate-[spin_0.8s_linear_infinite] rounded-full border-[6px] border-[#2e2e2e] border-t-[#42c383]",
        className
      )}
      {...props}
    />
  )
}

export { Spinner }
