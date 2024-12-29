import "@sp-design/token/lib/speeda-tokens.css";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/dropdownAction/sp-dropdown-action";

const meta: Meta = {
  title: "DropdownAction/sp-dropdown-action",
  component: "sp-dropdown-action",
  argTypes: {},
  args: {},
};
export default meta;

type Story = StoryObj;

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
