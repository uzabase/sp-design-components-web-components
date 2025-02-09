import "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown-option";
import "@sp-design/token/lib/speeda-tokens.css";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-dropdown",
  args: {},
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
    <sp-dropdown placeholder="選択してください">
      <sp-dropdown-option text="Text1" value="Text1"></sp-dropdown-option>
      <sp-dropdown-option text="Text2" value="Text2"></sp-dropdown-option>
      <sp-dropdown-option text="Text3" value="Text3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};

export const LongText: Story = {
  render: () => html`
    <sp-dropdown placeholder="選択してください">
      <sp-dropdown-option
        text="Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1"
        value="Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1"
      ></sp-dropdown-option>
      <sp-dropdown-option text="Text2" value="Text2"></sp-dropdown-option>
      <sp-dropdown-option text="Text3" value="Text3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};

export const RightPosition: Story = {
  render: () => html`
    <div style="display: flex; justify-content: end">
      <sp-dropdown placeholder="選択してください" position="right">
        <sp-dropdown-option
          text="Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1"
          value="Text1"
        ></sp-dropdown-option>
        <sp-dropdown-option text="Text2" value="Text2"></sp-dropdown-option>
        <sp-dropdown-option text="Text3" value="Text3"></sp-dropdown-option>
      </sp-dropdown>
    </div>
  `,
};

export const Scroll: Story = {
  render: () => html`
    <sp-dropdown placeholder="選択してください">
      <sp-dropdown-option text="Text1" value="Text1"></sp-dropdown-option>
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

export const NoPlaceholder: Story = {
  render: () => html`
    <sp-dropdown>
      <sp-dropdown-option text="Text1" value="Text1"></sp-dropdown-option>
      <sp-dropdown-option text="Text2" value="Text2"></sp-dropdown-option>
      <sp-dropdown-option text="Text3" value="Text3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};
