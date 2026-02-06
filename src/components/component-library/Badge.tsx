import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type BadgeVariantKey = keyof typeof BadgeVariants.variant;
type BadgeSizeKey = keyof typeof BadgeVariants.size;

const BadgeVariants = {
  variant: {
    primary: "bg-primary text-surface",
    secondary: "bg-secondary text-surface",
    accent: "bg-accent-500 text-text",
    destructive: "bg-destructive text-surface",
    outline: "bg-transparent text-primary border border-primary",
  },
  size: {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  },
};

const badgeVariants = cva(
  ["inline-flex items-center justify-center rounded-md px-3"],
  {
    variants: BadgeVariants,
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Badge = ({
  variant,
  size,
  className,
  ...props
}: {
  variant?: BadgeVariantKey;
  size?: BadgeSizeKey;
  className?: string;
} & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
};

const variantOptions = Object.keys(BadgeVariants.variant);
const sizeOptions = Object.keys(BadgeVariants.size);

export { Badge, badgeVariants, variantOptions, sizeOptions };
