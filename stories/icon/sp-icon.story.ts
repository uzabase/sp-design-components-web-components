import "../../src/components/icon/sp-icon";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { speedaIconTypes } from "../../src/components/icon/icons";

const meta: Meta = {
  component: "sp-icon",
  argTypes: {
    text: { type: "string" },
    type: {
      control: { type: "select" },
      options: speedaIconTypes,
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
  },
  args: {
    text: "sp-icon-text",
    type: "home",
    size: "medium",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};