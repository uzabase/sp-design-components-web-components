import "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown-option";

import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const meta: Meta = {
  args: {
    selectType: "single",
  },
  render: (args) => html`
    <sp-dropdown select-type=${args.selectType}>
      <sp-dropdown-option text="Text1"></sp-dropdown-option>
      <sp-dropdown-option text="Text2"></sp-dropdown-option>
      <sp-dropdown-option text="Text3"></sp-dropdown-option>
      <sp-dropdown-option text="Text4"></sp-dropdown-option>
    </sp-dropdown>
  `,
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
