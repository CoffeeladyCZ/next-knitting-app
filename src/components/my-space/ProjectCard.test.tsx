import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/api/types";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} {...props} />,
}));

const mockProject = {
  id: 1,
  name: "Project Alpha",
  permalink: "project-alpha",
  comments_count: 0,
  completed_day_set: false,
  created_at: "2024-01-01T00:00:00Z",
  favorites_count: 0,
  first_photo: {
    small_url: "https://example.com/photo.jpg",
  },
  links: {},
  photos_count: 1,
  started_day_set: false,
  updated_at: "2024-01-02T00:00:00Z",
  user_id: 99,
  user: {
    id: 99,
    username: "jane",
    tiny_photo_url: "https://example.com/tiny.jpg",
    small_photo_url: "https://example.com/small.jpg",
    photo_url: "https://example.com/photo.jpg",
    large_photo_url: "https://example.com/large.jpg",
    profile_country_code: "US",
  },
} satisfies Project;

describe("ProjectCard", () => {
  it("renders project name and image", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();

    const image = screen.getByAltText("Project Alpha") as HTMLImageElement;
    expect(image.src).toContain(mockProject.first_photo?.small_url as string);
  });

  it("applies the provided hover color class on the card", () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText("Project Alpha");
    const card = image.closest('[data-slot="card"]');

    expect(card).not.toBeNull();
    expect(card).toHaveClass("hover:bg-secondary/10");
    expect(card).toHaveClass("w-64");
  });
});
