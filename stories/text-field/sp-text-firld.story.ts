import "../../src/components/text-field/sp-text-field";
import type { Meta, StoryObj } from "@storybook/web-components";
import "yakuhanjp/dist/css/yakuhanjp_s.css";

const meta: Meta = {
  component: "sp-text-field",
  argTypes: {
    text: { type: "string" },
    errorText: { type: "string" },
    supportText: { type: "string" },
    value: { type: "string" },
    required: { type: "boolean" },
    size: {
      control: { type: "select" },
      options: ["medium", "large"],
    },
  },
  args: {
    text: "sp-text-field",
    errorText: "sp-text-field-errorText",
    supportText: "sp-text-field-supportText",
    value: "sp-text-field-value",
    required: false,
    size: "medium",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    text: undefined,
    errorText: undefined,
    supportText: undefined,
    value: undefined,
    required: undefined,
    size: undefined,
  },
};

export const Property: Story = {
  args: {
    text: "メールアドレス",
    errorText: "入力してください",
    supportText: "サポートテキスト",
    value: "入力文字列",
    required: true,
    size: "medium",
  },
};
