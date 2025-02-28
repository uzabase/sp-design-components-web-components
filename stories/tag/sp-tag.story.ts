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
    color: {
      control: { type: "select" },
      options: ["gray", "green", "red", "yellow", "blue"],
      description: "Tag color variation",
      defaultValue: "gray",
    },
  },
  args: {
    slot: "sp-tag-text",
    removable: false,
    color: "gray",
  },
  render: (args) => {
    return html`<sp-tag ?removable=${args.removable} color=${args.color}
      >${args.slot}</sp-tag
    >`;
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

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sp-tag>Gray</sp-tag>
      <sp-tag color="green">Green</sp-tag>
      <sp-tag color="red">Red</sp-tag>
      <sp-tag color="yellow">Yellow</sp-tag>
      <sp-tag color="blue">Blue</sp-tag>
    </div>
  `,
};

export const RemovableColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sp-tag removable>Gray</sp-tag>
      <sp-tag removable color="green">Green</sp-tag>
      <sp-tag removable color="red">Red</sp-tag>
      <sp-tag removable color="yellow">Yellow</sp-tag>
      <sp-tag removable color="blue">Blue</sp-tag>
    </div>
  `,
};
