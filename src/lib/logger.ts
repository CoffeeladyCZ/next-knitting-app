import * as Sentry from "@sentry/nextjs";

type LogLevel = "error" | "warn" | "info" | "debug";

export type LogContext = {
  [key: string]: unknown;
};

const isDevelopment = process.env.NODE_ENV === "development";

function log(level: LogLevel, message: string, context?: LogContext) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  if (isDevelopment) {
    switch (level) {
      case "error":
        console.error(logMessage, context || "");
        break;
      case "warn":
        console.warn(logMessage, context || "");
        break;
      case "info":
        console.info(logMessage, context || "");
        break;
      case "debug":
        console.debug(logMessage, context || "");
        break;
    }
  }

  if (level === "error") {
    Sentry.captureException(new Error(message), {
      contexts: {
        custom: context || {},
      },
      tags: {
        logger: "true",
      },
    });
  } else if (level === "warn") {
    Sentry.addBreadcrumb({
      message,
      level: "warning",
      data: context,
    });
  }
}

export function loggerError(
  message: string,
  error?: Error | unknown,
  context?: LogContext
) {
  const errorContext: LogContext = {
    ...context,
    ...(error instanceof Error
      ? {
          errorMessage: error.message,
          errorStack: error.stack,
          errorName: error.name,
        }
      : { error: String(error) }),
  };

  log("error", message, errorContext);
}

export function loggerWarn(message: string, context?: LogContext) {
  log("warn", message, context);
}

export function loggerInfo(message: string, context?: LogContext) {
  log("info", message, context);
}

export function loggerDebug(message: string, context?: LogContext) {
  log("debug", message, context);
}

export const logger = {
  error: loggerError,
  warn: loggerWarn,
  info: loggerInfo,
  debug: loggerDebug,
};
