import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, variantOptions, sizeOptions } from "./Badge";

const meta = {
  component: Badge,
  title: "Badge",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A badge component that can be used to display status or tags.",
      },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    children: "Badge",
  },
  argTypes: {
    children: {
      description: "The content of the badge.",
    },
    variant: {
      description: "The variant of the badge.",
      control: {
        type: "select",
        options: variantOptions,
      },
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} as Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};
