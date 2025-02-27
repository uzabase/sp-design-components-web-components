import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/tag/sp-tag";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTag } from "../../src/components/tag/sp-tag";

const meta = {
  component: "sp-tag",
  argTypes: {
    slot: { type: "string" },
    removable: { type: "boolean" },
  },
  args: {
    slot: "sp-tag-text",
    removable: false,
  },
  render: (args) => {
    return html`<sp-tag ?removable=${args.removable}>${args.slot}</sp-tag>`;
  },
} satisfies Meta<SpTag>;

export default meta;
type Story = StoryObj<SpTag>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Removable: Story = {
  args: {
    removable: true,
  },
};
