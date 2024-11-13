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
        text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      ></sp-dropdown-action-item>
      <sp-dropdown-action-item text="企業を作成"></sp-dropdown-action-item>
      <sp-dropdown-action-item text="業界を作成"></sp-dropdown-action-item>
      <sp-dropdown-action-item text="技術を作成"></sp-dropdown-action-item>
    </sp-dropdown-action>
  `,
};
