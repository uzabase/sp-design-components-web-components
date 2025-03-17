import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/tag/sp-tag-removable";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTagRemovable } from "../../src/components/tag/sp-tag-removable";

const meta = {
  component: "sp-tag-removable",
  argTypes: {
    slot: { type: "string" },
    disabled: { type: "boolean" },
  },
  args: {
    slot: "sp-tag-removable-text",
    disabled: false,
  },
  render: (args) => {
    return html`<sp-tag-removable ?disabled=${args.disabled}>${args.slot}</sp-tag-removable>`;
  },
} satisfies Meta<SpTagRemovable>;

export default meta;
type Story = StoryObj<SpTagRemovable>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
