import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ButtonVariantKey = keyof typeof ButtonVariants.variant;
type ButtonSizeKey = keyof typeof ButtonVariants.size;

const ButtonVariants = {
  variant: {
    primary: "bg-primary text-white",
    destructive: "bg-red-500 text-white",
    outline: "bg-transparent text-primary border border-primary",
    secondary: "bg-secondary text-white",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
    link: "bg-transparent text-primary hover:bg-primary-100",
  },
  size: {
    sm: "text-sm  h-8 px-4",
    md: "text-base h-10 px-6",
    lg: "text-lg h-12 px-8",
    icon: "size-10",
  },
};

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,background-color] outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "cursor-pointer",
  ],
  {
    variants: ButtonVariants,
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariantKey;
  size?: ButtonSizeKey;
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

const variantOptions = Object.keys(ButtonVariants.variant);
const sizeOptions = Object.keys(ButtonVariants.size);

export { Button, buttonVariants, variantOptions, sizeOptions };
