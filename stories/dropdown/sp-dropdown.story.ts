import "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown-option";

import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const meta: Meta = {
  args: {
    selectType: "single",
    width: "320",
    placeholder: "選択してください"
  },
  render: (args) => html`
    <sp-dropdown select-type=${args.selectType} width=${args.width} placeholder=${args.placeholder}>
      <sp-dropdown-option text="Text1Text1Text1Text1" value="Text1Text1Text1Text1"></sp-dropdown-option>
      <sp-dropdown-option text="Text2" value="Text2"></sp-dropdown-option>
      <sp-dropdown-option text="Text3" value="Text3"></sp-dropdown-option>
      <sp-dropdown-option text="Text4" value="Text4"></sp-dropdown-option>
      <sp-dropdown-option text="Text5" value="Text5"></sp-dropdown-option>
      <sp-dropdown-option text="Text6" value="Text6"></sp-dropdown-option>
      <sp-dropdown-option text="Text7" value="Text7"></sp-dropdown-option>
      <sp-dropdown-option text="Text8" value="Text8"></sp-dropdown-option>
      <sp-dropdown-option text="Text9" value="Text9"></sp-dropdown-option>
      <sp-dropdown-option text="Text10" value="Text10"></sp-dropdown-option>
      <sp-dropdown-option text="Text11" value="Text11"></sp-dropdown-option>
    </sp-dropdown>
  `,
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
