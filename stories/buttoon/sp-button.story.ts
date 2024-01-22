import "../../src/components/button/sp-button";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/styles/speeda-tokens.css";

const meta: Meta = {
  component: "sp-button",
  argTypes: {
    text: { type: "string" },
    type: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
    appearance: {
      control: { type: "select" },
      options: ["outline", "fill", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "large", "xLarge", "width160", "width80"],
    },
    disabled: { type: "boolean" },
  },
  args: {
    text: "sp-button-text",
    type: "default",
    appearance: "fill",
    size: "medium",
    disabled: false,
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
