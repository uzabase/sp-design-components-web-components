import "../../src/components/button/sp-button";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { speedaIconTypes } from "../../src/components/icon/icons";

const meta: Meta = {
  component: "sp-button",
  argTypes: {
    text: { type: "string" },
    icon: {
      control: { type: "select" },
      options: ["", ...speedaIconTypes],
    },
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
    loading: { type: "boolean" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    text: "sp-button-text",
    icon: "",
    type: "default",
    appearance: "fill",
    size: "medium",
    loading: false,
    selected: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};