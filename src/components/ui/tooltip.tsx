"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tooltipVariants = cva(
  "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md px-3 py-1.5 text-balance has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      typography: {
        default: "text-xs",
        mono: "text-xs font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
      typography: "default",
    },
  }
)

const tooltipArrowVariants = cva(
  "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
  {
    variants: {
      arrowVariant: {
        defaultArrow: "bg-primary fill-primary",
        destructiveArrow: "bg-destructive fill-destructive",
        outlineArrow: "border border-input bg-background fill-background",
        secondaryArrow: "bg-secondary fill-secondary",
      },
    },
    defaultVariants: {
      arrowVariant: "defaultArrow",
    },
  }
)

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({
  delay,
  ...props
}: TooltipPrimitive.Root.Props & { delay?: number }) {
  return (
    <TooltipProvider delay={delay}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export interface TooltipContentProps
  extends TooltipPrimitive.Popup.Props,
    Pick<
      TooltipPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    >,
    VariantProps<typeof tooltipVariants>,
    VariantProps<typeof tooltipArrowVariants> {}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  variant,
  typography,
  arrowVariant,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(tooltipVariants({ variant, typography, className }))}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            className={cn(tooltipArrowVariants({ arrowVariant }))}
            data-slot="tooltip-arrow"
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipVariants,
}
