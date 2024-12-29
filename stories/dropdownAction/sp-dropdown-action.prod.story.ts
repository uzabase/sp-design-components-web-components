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
};
