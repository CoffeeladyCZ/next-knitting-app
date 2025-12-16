import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, type IconProps } from "./Icon";

type TextFieldVariantKey = keyof typeof TextFieldVariants.variant;

type TextFieldProps = React.ComponentProps<"input"> & {
  icon?: IconProps["as"];
  iconRight?: IconProps["as"];
  variant?: TextFieldVariantKey;
};

const TextFieldVariants = {
  variant: {
    default: "inline-flex",
    full: "w-full",
  },
};

const textFieldVariants = cva("relative flex items-center", {
  variants: TextFieldVariants,
  defaultVariants: {
    variant: "default",
  },
});

export const TextField = ({
  className,
  type,
  icon,
  iconRight,
  variant,
  name,
  ...props
}: TextFieldProps) => {
  const hasLeftIcon = !!icon;
  const hasRightIcon = !!iconRight;

  return (
    <div className={cn(textFieldVariants({ variant }), className)}>
      {icon && (
        <div className="absolute left-3 flex items-center pointer-events-none">
          <Icon as={icon} size="sm" className="text-muted-foreground" />
        </div>
      )}
      <input
        type={type}
        name={name}
        data-slot="input"
        className={cn(
          textFieldVariants({ variant }),
          "flex h-9 min-w-0 border border-input bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          hasLeftIcon ? "pl-9" : "px-3",
          hasRightIcon ? "pr-9" : "",
          "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        )}
        {...props}
      />
      {iconRight && (
        <div className="absolute right-3 flex items-center pointer-events-none">
          <Icon as={iconRight} size="sm" className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

const variantOptions = Object.keys(TextFieldVariants.variant);

export { textFieldVariants, variantOptions };
