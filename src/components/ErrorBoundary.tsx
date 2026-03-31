"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { Button } from "@/components/component-library/Button";
import type { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const t = useTranslations();

  Sentry.captureException(error);

  const handleReset = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-destructive">
          {t("errorBoundary.title")}
        </h1>
        <p className="mb-6 text-gray-600">{t("errorBoundary.message")}</p>
        {process.env.NODE_ENV === "development" && error && (
          <details className="mb-6 rounded bg-gray-100 p-4 text-left">
            <summary className="cursor-pointer font-semibold">
              {t("errorBoundary.details")}
            </summary>
            <pre className="mt-2 overflow-auto text-sm">
              {error.toString()}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <Button onClick={handleReset} variant="primary">
          {t("errorBoundary.reload")}
        </Button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
