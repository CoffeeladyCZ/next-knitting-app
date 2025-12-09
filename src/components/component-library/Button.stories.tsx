import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, sizeOptions, variantOptions } from "./Button";

const meta = {
  component: Button,
  title: "Button",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A button component that can be used to trigger actions.",
      },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
    asChild: false,
    disabled: false,
  },
  argTypes: {
    children: {
      description: "The content of the button.",
    },
    variant: {
      description: "The variant of the button.",
      control: {
        type: "select",
        options: variantOptions,
      },
    },
    size: {
      description: "The size of the button.",
      control: "radio",
      options: sizeOptions,
    },
    disabled: {
      description: "Whether the button is disabled.",
      control: "boolean",
    },
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const SizeIcon: Story = {
  args: { size: "icon", children: "🚀" },
};
