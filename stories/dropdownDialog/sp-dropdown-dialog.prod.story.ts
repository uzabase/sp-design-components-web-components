import "@sp-design/token/lib/speeda-tokens.css";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/dropdownDialog/sp-dropdown-dialog";

const meta: Meta = {
  title: "DropdownDialog/sp-dropdown-dialog",
  component: "sp-dropdown-dialog",
  argTypes: {},
  args: {},
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
    <sp-dropdown-dialog label="ダイアログを表示">
      <h1>ダイアログのタイトル</h1>
      ダイアログの内容
    </sp-dropdown-dialog>
  `,
};
