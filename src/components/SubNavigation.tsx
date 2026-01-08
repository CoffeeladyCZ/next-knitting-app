"use client";

import { Button } from "@/components/component-library/Button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SubNavigationItem = {
  href: string;
  label: string;
};

type Props = {
  items: SubNavigationItem[];
  activeHref?: string;
};

export const SubNavigation = ({ items, activeHref }: Props) => {
  const pathname = usePathname();
  const activePath = activeHref ?? pathname;

  const basePath =
    items.length > 0
      ? items[0].href.substring(0, items[0].href.lastIndexOf("/"))
      : "";

  return (
    <div className="px-4 mb-6">
      <nav className="flex gap-1">
        {items.map((item, index) => {
          const isBasePath = pathname === basePath && index === 0;
          const isActive =
            isBasePath ||
            activePath === item.href ||
            activePath.startsWith(item.href + "/");
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="md"
              asChild
              className={cn(
                "rounded-none",
                isActive && "border-b-2 border-primary",
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
