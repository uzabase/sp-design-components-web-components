import "../../../src/components/form/error-text/sp-error-text";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpErrorText } from "../../../src/components/form/error-text/sp-error-text";

const meta = {
  component: "sp-error-text",
  argTypes: {
    slot: { type: "string" },
  },
  render: (args) => html`
    <sp-error-text>${args.slot ?? "エラーメッセージ"}</sp-error-text>
  `,
} satisfies Meta<SpErrorText>;

export default meta;
type Story = StoryObj<SpErrorText>;

export const Basic: Story = {
  args: {
    slot: "必須項目です",
  },
};

export const LongMessage: Story = {
  args: {
    slot: "パスワードは8文字以上で入力してください。英数字を含める必要があります。",
  },
};
