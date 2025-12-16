import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactElement } from "react";
import { Patterns } from "./Dashboard";
import * as hooks from "@/api/hooks";
import type { PatternResponse } from "@/api/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../locales/en/common.json";

vi.mock("@/api/hooks", () => ({
  useGetPatterns: vi.fn(),
}));
vi.mock("next-intl", async () => {
  const actual = await vi.importActual("next-intl");
  return {
    ...actual,
    useTranslations: () => (key: string, values?: Record<string, string>) => {
      if (key === "loading") return "Loading...";
      if (key === "error") return `Error: ${values?.error || ""}`;
      if (key === "patterns.title") return "Patterns";
      if (key === "patterns.description") return "... powered by Ravelry";
      if (key === "patterns.search") return "Search patterns...";
      if (key === "patterns.next") return "More patterns";
      if (key === "patterns.card.designer") return "Designer";
      return key;
    },
  };
});
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));
vi.mock("@/components/SignOut", () => ({
  SignOut: () => <div data-testid="sign-out">Sign Out</div>,
}));

const mockUseGetPatterns = vi.mocked(hooks.useGetPatterns);

const mockPatterns: PatternResponse = {
  patterns: [
    {
      id: 1,
      name: "Test Pattern 1",
      permalink: "test-pattern-1",
      free: true,
      first_photo: {
        small_url: "https://example.com/pattern1.jpg",
      },
      designer: {
        name: "Test Designer 1",
      },
    },
    {
      id: 2,
      name: "Test Pattern 2",
      permalink: "test-pattern-2",
      free: false,
      first_photo: {
        small_url: "https://example.com/pattern2.jpg",
      },
      designer: {
        name: "Test Designer 2",
      },
    },
  ],
  paginator: {
    last_page: 1,
    page: 1,
    page_count: 1,
    page_size: 20,
    results: 2,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale="en" messages={messages}>
        {component}
      </NextIntlClientProvider>
    </QueryClientProvider>,
  );
};

describe("Patterns Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseGetPatterns.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("renders error state", () => {
    const errorMessage = "Failed to fetch patterns";
    mockUseGetPatterns.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: errorMessage } as Error,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy();
  });

  it("renders patterns when data is loaded", async () => {
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    
    await waitFor(() => {
      expect(screen.getByText("Patterns")).toBeTruthy();
    });
    expect(screen.getByText("... powered by Ravelry")).toBeTruthy();
    expect(screen.getByText("Test Pattern 1")).toBeTruthy();
    expect(screen.getByText("Test Pattern 2")).toBeTruthy();
  });

  it("renders search input", async () => {
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search patterns..."),
      ).toBeTruthy();
    });
  });

  it("submits search form on Enter key press", async () => {
    const user = userEvent.setup();
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search patterns...")).toBeTruthy();
    });
    
    const searchInput = screen.getByPlaceholderText("Search patterns...");

    await user.type(searchInput, "sweater");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(mockUseGetPatterns).toHaveBeenLastCalledWith("sweater", 1, 10);
    });
  });

  it("clears search input after submission", async () => {
    const user = userEvent.setup();
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search patterns...")).toBeTruthy();
    });
    
    const searchInput = screen.getByPlaceholderText(
      "Search patterns...",
    ) as HTMLInputElement;

    await user.type(searchInput, "sweater");
    expect(searchInput.value).toBe("sweater");

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(searchInput.value).toBe("");
    });
  });

  it("handles empty search query", async () => {
    const user = userEvent.setup();
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search patterns...")).toBeTruthy();
    });
    
    const searchInput = screen.getByPlaceholderText("Search patterns...");

    await user.type(searchInput, "   ");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(mockUseGetPatterns).toHaveBeenLastCalledWith(undefined, 1, 10);
    });
  });

  it("displays patterns powered by Ravelry text", async () => {
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithProviders(<Patterns />);
    
    await waitFor(() => {
      expect(screen.getByText("... powered by Ravelry")).toBeTruthy();
    });
  });
});
