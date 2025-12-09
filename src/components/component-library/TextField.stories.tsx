import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { TextField } from "./TextField";
import { Label } from "./Label";

const meta = {
  title: "TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A basic input component with various states and types.",
      },
    },
  },
  args: {
    placeholder: "Enter text...",
    className: "max-w-sm",
  },
  argTypes: {
    type: {
      description: "The type of input",
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    variant: {
      description: "The variant of the text field",
      control: "select",
      options: ["default", "full"],
    },
    disabled: {
      description: "Whether the input is disabled",
      control: "boolean",
    },
    readOnly: {
      description: "Whether the input is read only",
      control: "boolean",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "Hello",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled input",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "Read only text",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">Name</Label>
      <TextField type="name" id="name" placeholder="Enter your name" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Name</Label>
      <TextField
        type="text"
        id="name"
        placeholder="Enter your name"
        aria-invalid="true"
        aria-describedby="name-error"
      />
      <p id="name-error" className="text-sm text-destructive">
        Name is required
      </p>
    </div>
  ),
};

export const WithSearchIcon: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
    icon: Search,
  },
};

export const FullVariant: Story = {
  args: {
    variant: "full",
    placeholder: "Full width text field",
    className: "",
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div className="w-full">
      <TextField {...args} />
    </div>
  ),
};
