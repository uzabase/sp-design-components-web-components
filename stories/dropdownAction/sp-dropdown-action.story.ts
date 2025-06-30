import "../../src/components/dropdownAction/sp-dropdown-action";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpDropdownAction } from "../../src/components/dropdownAction/sp-dropdown-action";

const meta = {
  component: "sp-dropdown-action",
  argTypes: {},
  args: {},
} satisfies Meta<SpDropdownAction>;

export default meta;
type Story = StoryObj<SpDropdownAction>;

export const Basic: Story = {
  render: () => html`
    <sp-dropdown-action label="ダッシュボード新規作成">
      <sp-dropdown-action-item @click=${() => alert("企業を作成")}
        >企業を作成</sp-dropdown-action-item
      >
      <sp-dropdown-action-item @click=${() => alert("業界を作成")}
        >業界を作成</sp-dropdown-action-item
      >
    </sp-dropdown-action>
  `,
  tags: ["!dev-only"],
};

export const LongText: Story = {
  render: () => html`
    <sp-dropdown-action label="ダッシュボード新規作成">
      <sp-dropdown-action-item
        >AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</sp-dropdown-action-item
      >
    </sp-dropdown-action>
  `,
};

export const RightPosition: Story = {
  render: () => html`
    <div style="display: flex; justify-content: end">
      <sp-dropdown-action label="ダッシュボード新規作成" open position="right">
        <sp-dropdown-action-item
          >AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</sp-dropdown-action-item
        >
      </sp-dropdown-action>
    </div>
  `,
};

export const FullWidth: Story = {
  render: () => html`
    <style>
      sp-dropdown-action::part(button) {
        width: 100%;
      }
    </style>
    <sp-dropdown-action label="ダッシュボード新規作成">
      <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
    </sp-dropdown-action>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <sp-dropdown-action label="ダッシュボード新規作成" disabled>
      <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
    </sp-dropdown-action>
  `,
};
