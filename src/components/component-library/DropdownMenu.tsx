import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

const DropdownMenuRoot = ({
  modal = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root modal={modal} {...props} />
);
DropdownMenuRoot.displayName = DropdownMenuPrimitive.Root.displayName;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "group relative flex h-9 select-none items-center rounded-sm px-2 py-1.5 text-sm text-text outline-none transition-colors",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "data-highlighted:bg-primary/10 data-highlighted:text-primary",
      "data-[state=open]:bg-primary/10",
      className
    )}
    {...props}
  />
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "dropdown-menu-content z-50 min-w-32 overflow-hidden rounded-md border border-primary/20 bg-surface p-1 text-text",
      "shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)]",
      "will-change-[opacity,transform]",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 5, collisionPadding = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(
        "min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] will-change-[opacity,transform]",
        "data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-primary outline-none",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "data-highlighted:bg-primary/10 data-highlighted:text-primary",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-text",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("m-[5px] h-px bg-primary/20", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  RadioGroup: DropdownMenuRadioGroup,
});
