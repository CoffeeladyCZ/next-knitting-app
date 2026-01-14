import { cn } from "@/lib/utils";

type CardVariant = "full" | "content";

const cardVariantClasses: Record<CardVariant, string> = {
  full: "w-full",
  content: "max-w-sm w-full mx-auto",
};

function CardRoot({
  className,
  variant = "content",
  hoverClass,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: CardVariant;
  hoverClass?: string;
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col items-center p-4 cursor-pointer transition-colors duration-300",
        hoverClass ?? "hover:bg-[rgba(255,187,171,0.7)]",
        cardVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={className} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-lg font-bold", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="card-content"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export const Card = Object.assign(CardRoot, {
  Header: Object.assign(CardHeader, {
    Title: CardTitle,
  }),
  Content: CardContent,
});
