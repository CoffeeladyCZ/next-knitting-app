import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger } from "./logger";
import * as Sentry from "@sentry/nextjs";

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
  addBreadcrumb: vi.fn(),
}));

describe("Logger", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.clearAllMocks();
    // Set NODE_ENV for tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = "development";
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original NODE_ENV
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = originalEnv;
  });

  it("logs error and sends to Sentry", () => {
    const error = new Error("Test error");
    logger.error("Test error message", error, { context: "test" });

    expect(console.error).toHaveBeenCalled();
    expect(Sentry.captureException).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        contexts: expect.objectContaining({
          custom: expect.objectContaining({
            context: "test",
            errorMessage: "Test error",
            errorName: "Error",
          }),
        }),
        tags: expect.objectContaining({
          logger: "true",
        }),
      })
    );
  });

  it("logs warning and adds breadcrumb to Sentry", () => {
    logger.warn("Test warning", { context: "test" });

    expect(console.warn).toHaveBeenCalled();
    expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Test warning",
        level: "warning",
        data: { context: "test" },
      })
    );
  });

  it("logs info message", () => {
    logger.info("Test info", { context: "test" });

    expect(console.info).toHaveBeenCalled();
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it("logs debug message", () => {
    logger.debug("Test debug", { context: "test" });

    expect(console.debug).toHaveBeenCalled();
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it("handles non-Error objects in error logging", () => {
    logger.error("Test error", "string error", { context: "test" });

    expect(console.error).toHaveBeenCalled();
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        contexts: expect.objectContaining({
          custom: expect.objectContaining({
            context: "test",
            error: "string error",
          }),
        }),
      })
    );
  });
});
