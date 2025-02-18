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
      <sp-dropdown-option text="選択肢1" value="value1"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢2" value="value2"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢3" value="value3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};

export const LongText: Story = {
  render: () => html`
    <sp-dropdown placeholder="選択してください">
      <sp-dropdown-option
        text="長ーーーーーーーーーーーーーーーーーーーーーーーい選択肢"
        value="value1"
      ></sp-dropdown-option>
      <sp-dropdown-option text="選択肢2" value="value2"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢3" value="value3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};

export const RightPosition: Story = {
  render: () => html`
    <div style="display: flex; justify-content: end">
      <sp-dropdown placeholder="選択してください" position="right">
        <sp-dropdown-option
          text="長ーーーーーーーーーーーーーーーーーーーーーーーい選択肢"
          value="value1"
        ></sp-dropdown-option>
        <sp-dropdown-option text="選択肢2" value="value2"></sp-dropdown-option>
        <sp-dropdown-option text="選択肢3" value="value3"></sp-dropdown-option>
      </sp-dropdown>
    </div>
  `,
};

export const Scroll: Story = {
  render: () => html`
    <sp-dropdown placeholder="選択してください">
      <sp-dropdown-option text="選択肢1" value="value1"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢2" value="value2"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢3" value="value3"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢4" value="value4"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢5" value="value5"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢6" value="value6"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢7" value="value7"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢8" value="value8"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢9" value="value9"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢10" value="value10"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢11" value="value11"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢12" value="value12"></sp-dropdown-option>
    </sp-dropdown>
  `,
};

export const NoPlaceholder: Story = {
  render: () => html`
    <sp-dropdown>
      <sp-dropdown-option text="選択肢1" value="value1"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢2" value="value2"></sp-dropdown-option>
      <sp-dropdown-option text="選択肢3" value="value3"></sp-dropdown-option>
    </sp-dropdown>
  `,
};
