import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

type CardStoryProps = {
  title: string;
  description: string;
  url: string;
  variant: "full" | "content";
};

const meta: Meta<CardStoryProps> = {
  title: "Card",
  component: Card as unknown as React.ComponentType<CardStoryProps>,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A card component that can be used to display content in a card format.",
      },
    },
  },
  args: {
    title: "Test Repository",
    description: "This is a test repository",
    url: "https://github.com/test/repo",
    variant: "content",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    url: { control: "text" },
    variant: {
      control: "radio",
      options: ["full", "content"],
    },
  },
};

export default meta;

type Story = StoryObj<CardStoryProps>;

export const Default: Story = {
  render: ({ title, description, url, variant }) => (
    <Card variant={variant}>
      <Card.Header>
        <Card.Header.Title>{title}</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <p>{description}</p>
        <a href={url} className="text-blue-600 hover:underline">
          {url}
        </a>
      </Card.Content>
    </Card>
  ),
};
