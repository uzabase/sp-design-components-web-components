import "../../src/components/dropdownAction/sp-dropdown-action";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const meta: Meta = {
  component: "sp-dropdown-action",
  argTypes: {},
  args: {},
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};

export const WithItems: Story = {
  render: () => html`
    <sp-dropdown-action label="ダッシュボード新規作成">
      <sp-dropdown-action-item
        >AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</sp-dropdown-action-item
      >
      <sp-dropdown-action-item @click=${() => alert("企業を作成")}>企業を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>技術を作成</sp-dropdown-action-item>
    </sp-dropdown-action>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <sp-dropdown-action label="ダッシュボード新規作成" disabled>
      <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>技術を作成</sp-dropdown-action-item>
    </sp-dropdown-action>
  `,
};

export const Open: Story = {
  render: () => html`
    <sp-dropdown-action label="ダッシュボード新規作成" open>
      <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
      <sp-dropdown-action-item>技術を作成</sp-dropdown-action-item>
    </sp-dropdown-action>
  `,
};

export const RightPosition: Story = {
  render: () => html`
    <div style="display: flex; justify-content: end">
      <sp-dropdown-action label="ダッシュボード新規作成" oep position="right">
        <sp-dropdown-action-item
          >AAAAAAAAAAAAAAAAAAAAAAAAA</sp-dropdown-action-item
        >
        <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
        <sp-dropdown-action-item>技術を作成</sp-dropdown-action-item>
      </sp-dropdown-action>
    </div>
  `,
};
