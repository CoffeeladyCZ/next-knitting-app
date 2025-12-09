import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "../../app/test/test-utils";
import userEvent from "@testing-library/user-event";
import { type ReactElement } from "react";
import { Patterns } from "./Dashboard";
import * as hooks from "../../api/ravelry/hooks";
import type { PatternResponse } from "../../api/ravelry/types";
import { MemoryRouter } from "react-router";

vi.mock("../../api/ravelry/hooks");

const mockUseGetPatterns = vi.mocked(hooks.useGetPatterns);

const mockPatterns: PatternResponse = {
  patterns: [
    {
      id: 1,
      name: "Test Pattern 1",
      permalink: "test-pattern-1",
      free: true,
    },
    {
      id: 2,
      name: "Test Pattern 2",
      permalink: "test-pattern-2",
      free: false,
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

const renderWithRouter = (component: ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
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

    renderWithRouter(<Patterns />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    const errorMessage = "Failed to fetch patterns";
    mockUseGetPatterns.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: errorMessage } as Error,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithRouter(<Patterns />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("renders patterns when data is loaded", () => {
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithRouter(<Patterns />);
    expect(screen.getByText("Patterns")).toBeInTheDocument();
    expect(screen.getByText("... powered by Ravelry")).toBeInTheDocument();
    expect(screen.getByText("Test Pattern 1")).toBeInTheDocument();
    expect(screen.getByText("Test Pattern 2")).toBeInTheDocument();
  });

  it("renders search input", () => {
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithRouter(<Patterns />);
    expect(
      screen.getByPlaceholderText("Search patterns..."),
    ).toBeInTheDocument();
  });

  it("submits search form on Enter key press", async () => {
    const user = userEvent.setup();
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithRouter(<Patterns />);
    const searchInput = screen.getByPlaceholderText("Search patterns...");

    await user.type(searchInput, "sweater");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(mockUseGetPatterns).toHaveBeenCalledWith("sweater", 1, 10);
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

    renderWithRouter(<Patterns />);
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

    renderWithRouter(<Patterns />);
    const searchInput = screen.getByPlaceholderText("Search patterns...");

    await user.type(searchInput, "   ");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(mockUseGetPatterns).toHaveBeenCalledWith(undefined, 1, 10);
    });
  });

  it("displays patterns powered by Ravelry text", () => {
    mockUseGetPatterns.mockReturnValue({
      data: mockPatterns,
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof hooks.useGetPatterns>);

    renderWithRouter(<Patterns />);
    expect(screen.getByText("... powered by Ravelry")).toBeInTheDocument();
  });
});
