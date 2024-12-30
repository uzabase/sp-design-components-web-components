import "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown-option";

import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const meta: Meta = {
  args: {
    selectType: "single",
    width: "480"
  },
  render: (args) => html`
    <sp-dropdown select-type=${args.selectType} width=${args.width}>
      <sp-dropdown-option text="Text1Text1Text1Text1" value="Text1Text1Text1Text1"></sp-dropdown-option>
      <sp-dropdown-option text="Text2" value="Text2"></sp-dropdown-option>
      <sp-dropdown-option text="Text3" value="Text3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
