import "../../../src/components/form/label/sp-label";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpLabel } from "../../../src/components/form/label/sp-label";

const meta = {
  component: "sp-label",
  argTypes: {
    slot: { type: "string" },
    required: { type: "boolean" },
  },
  render: (args) => html`
    <sp-label ?required=${args.required}>${args.slot}</sp-label>
  `,
} satisfies Meta<SpLabel>;

export default meta;
type Story = StoryObj<SpLabel>;

export const Basic: Story = {
  args: {
    slot: "ラベル",
    required: false,
  },
  tags: ["!dev-only"],
};

export const Required: Story = {
  args: {
    slot: "必須ラベル",
    required: true,
  },
};

export const MultiLine: Story = {
  render: () => html`
    <div style="width: 300px; border: 1px dashed #ccc; padding: 8px;">
      <sp-label
        >これは非常に長いラベルテキストの例です。このテキストが2行以上になったときのレイアウトを確認することができます。</sp-label
      >
    </div>
  `,
};

export const MultiLineRequired: Story = {
  render: () => html`
    <div style="width: 300px; border: 1px dashed #ccc; padding: 8px;">
      <sp-label required
        >これは非常に長い必須ラベルテキストの例です。このテキストが2行以上になったときのレイアウトを確認することができます。</sp-label
      >
    </div>
  `,
};
