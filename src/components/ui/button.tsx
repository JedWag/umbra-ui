import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        text: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Icon-only button preset: bakes in variant="text" size="icon" (the pairing used at every
// icon-only button site - topbar actions, calendar/list nav arrows) so apps never set either.
function IconButton({
  className,
  ...props
}: Omit<ButtonPrimitive.Props, "children"> & {
  "aria-label": string
  children: React.ReactNode
}) {
  return <Button variant="text" size="icon" className={className} {...props} />
}

type PresetButtonProps = Omit<ButtonPrimitive.Props, "children"> & {
  size?: VariantProps<typeof buttonVariants>["size"]
  children?: React.ReactNode
}

// Status-color action buttons: own their color styling directly (border+tint, hover-flip to a
// solid fill) instead of going through Button's variant system - nothing ever picked these
// colors as a plain Button variant, so keeping them as standalone modules avoids a redundant
// unused variant sitting in buttonVariants. Default label matches the button's usual role, but
// can be overridden (e.g. <SuccessButton>Yes</SuccessButton>).
function WarningButton({ className, size = "default", children = "Cancel", ...props }: PresetButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ size }),
        "border border-[var(--status-orange-border)] bg-[var(--status-orange-bg)] text-[var(--status-orange-border)] hover:border-[var(--status-orange-bg)] hover:bg-[var(--status-orange-border)] hover:text-[var(--status-orange-bg)]",
        className
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

function SuccessButton({ className, size = "default", children = "Save", ...props }: PresetButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ size }),
        "border border-[var(--status-green-border)] bg-[var(--status-green-bg)] text-[var(--status-green-border)] hover:border-[var(--status-green-bg)] hover:bg-[var(--status-green-border)] hover:text-[var(--status-green-bg)]",
        className
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

function DangerButton({ className, size = "default", children = "Delete", ...props }: PresetButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ size }),
        "border border-[var(--status-red-border)] bg-[var(--status-red-bg)] text-[var(--status-red-border)] hover:border-[var(--status-red-bg)] hover:bg-[var(--status-red-border)] hover:text-[var(--status-red-bg)]",
        className
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants, IconButton, WarningButton, SuccessButton, DangerButton }
