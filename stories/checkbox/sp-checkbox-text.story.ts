import "../../src/components/checkbox/sp-checkbox-text";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";

const meta: Meta = {
  component: "sp-checkbox-text",
  argTypes: {
    text: { type: "string" },
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    text: "sp-checkbox-text-text",
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
