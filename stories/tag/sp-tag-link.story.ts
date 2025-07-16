import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/tag/sp-tag-link";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpTagLink } from "../../src/components/tag/sp-tag-link";

const meta = {
  component: "sp-tag-link",
  argTypes: {
    slot: { type: "string" },
    href: { type: "string" },
    disabled: { type: "boolean" },
  },
  args: {
    slot: "sp-tag-link-text",
    href: "#",
    disabled: false,
  },
  render: (args) => {
    return html`<sp-tag-link href=${args.href} ?disabled=${args.disabled}
      >${args.slot}</sp-tag-link
    >`;
  },
} satisfies Meta<SpTagLink>;

export default meta;
type Story = StoryObj<SpTagLink>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
