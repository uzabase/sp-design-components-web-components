import "../../src/components/tag/sp-tag-liquid";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-tag-liquid",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["gray", "green", "red", "yellow", "blue"],
    },
    light: {
      control: { type: "boolean" },
      description: "ライト/ダークモード（※grayカラーはライトモードのみ）",
    },
  },
  args: {
    type: "gray",
    light: false,
    text: "タグ",
  },
  render: (args) => html`
    <sp-tag-liquid type="${args.type}" ?light="${args.light}">
      ${args.text}
    </sp-tag-liquid>
  `,
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const LightThemeColors: Story = {
  tags: ["!dev-only"],
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sp-tag-liquid type="gray" light>Gray Light</sp-tag-liquid>
      <sp-tag-liquid type="green" light>Green Light</sp-tag-liquid>
      <sp-tag-liquid type="red" light>Red Light</sp-tag-liquid>
      <sp-tag-liquid type="yellow" light>Yellow Light</sp-tag-liquid>
      <sp-tag-liquid type="blue" light>Blue Light</sp-tag-liquid>
    </div>
  `,
};

export const DarkThemeColors: Story = {
  tags: ["!dev-only"],
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sp-tag-liquid type="green">Green Dark</sp-tag-liquid>
      <sp-tag-liquid type="red">Red Dark</sp-tag-liquid>
      <sp-tag-liquid type="yellow">Yellow Dark</sp-tag-liquid>
      <sp-tag-liquid type="blue">Blue Dark</sp-tag-liquid>
    </div>
  `,
};

export const AllVariants: Story = {
  tags: ["!dev-only"],
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3>Light Variants</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
          <sp-tag-liquid type="gray" light>Gray Light</sp-tag-liquid>
          <sp-tag-liquid type="green" light>Green Light</sp-tag-liquid>
          <sp-tag-liquid type="red" light>Red Light</sp-tag-liquid>
          <sp-tag-liquid type="yellow" light>Yellow Light</sp-tag-liquid>
          <sp-tag-liquid type="blue" light>Blue Light</sp-tag-liquid>
        </div>
      </div>
      <div>
        <h3>Dark Variants</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
          <sp-tag-liquid type="green">Green Dark</sp-tag-liquid>
          <sp-tag-liquid type="red">Red Dark</sp-tag-liquid>
          <sp-tag-liquid type="yellow">Yellow Dark</sp-tag-liquid>
          <sp-tag-liquid type="blue">Blue Dark</sp-tag-liquid>
        </div>
      </div>
    </div>
  `,
};
