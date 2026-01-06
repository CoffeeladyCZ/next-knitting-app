import { useEffect } from "react";

/**
 * Prevents layout shift when Radix UI components (like DropdownMenu) open
 * by maintaining consistent padding-right on body element
 */
export const usePreventLayoutShift = (isOpen: boolean) => {
  useEffect(() => {
    if (typeof window === "undefined" || !isOpen) return;

    const body = document.body;
    const originalPaddingRight = window.getComputedStyle(body).paddingRight;

    const observer = new MutationObserver(() => {
      const currentPadding = window.getComputedStyle(body).paddingRight;
      if (currentPadding !== originalPaddingRight) {
        body.style.paddingRight = originalPaddingRight;
      }
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["style", "data-radix-scroll-lock"],
    });

    return () => observer.disconnect();
  }, [isOpen]);
};
