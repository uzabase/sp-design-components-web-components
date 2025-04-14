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
    mode: {
      control: { type: "select" },
      options: ["light", "dark"],
      description:
        "ライト/ダークモード（※Grayカラーではlightモードのみ使用可）",
    },
  },
  args: {
    type: "gray",
    mode: "light",
    text: "タグ",
  },
  render: (args) => html`
    <sp-tag-liquid type="${args.type}" mode="${args.mode}"
      >${args.text}</sp-tag-liquid
    >
  `,
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const ThemeColors: Story = {
  tags: ["!dev-only"],
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sp-tag-liquid type="gray" mode="light">Gray Light</sp-tag-liquid>
      <sp-tag-liquid type="green" mode="light">Green Light</sp-tag-liquid>
      <sp-tag-liquid type="red" mode="light">Red Light</sp-tag-liquid>
      <sp-tag-liquid type="yellow" mode="light">Yellow Light</sp-tag-liquid>
      <sp-tag-liquid type="blue" mode="light">Blue Light</sp-tag-liquid>
    </div>
  `,
};

export const DarkThemeColors: Story = {
  tags: ["!dev-only"],
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sp-tag-liquid type="green" mode="dark">Green Dark</sp-tag-liquid>
      <sp-tag-liquid type="red" mode="dark">Red Dark</sp-tag-liquid>
      <sp-tag-liquid type="yellow" mode="dark">Yellow Dark</sp-tag-liquid>
      <sp-tag-liquid type="blue" mode="dark">Blue Dark</sp-tag-liquid>
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
          <sp-tag-liquid type="gray" mode="light">Gray Light</sp-tag-liquid>
          <sp-tag-liquid type="green" mode="light">Green Light</sp-tag-liquid>
          <sp-tag-liquid type="red" mode="light">Red Light</sp-tag-liquid>
          <sp-tag-liquid type="yellow" mode="light"
            >Yellow Light</sp-tag-liquid
          >
          <sp-tag-liquid type="blue" mode="light">Blue Light</sp-tag-liquid>
        </div>
      </div>
      <div>
        <h3>Dark Variants</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
          <sp-tag-liquid type="green" mode="dark">Green Dark</sp-tag-liquid>
          <sp-tag-liquid type="red" mode="dark">Red Dark</sp-tag-liquid>
          <sp-tag-liquid type="yellow" mode="dark">Yellow Dark</sp-tag-liquid>
          <sp-tag-liquid type="blue" mode="dark">Blue Dark</sp-tag-liquid>
        </div>
      </div>
    </div>
  `,
};
