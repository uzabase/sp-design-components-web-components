import "../../src/components/checkbox/sp-checkbox";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";
import { action } from "@storybook/addon-actions";

const meta: Meta = {
  component: "sp-checkbox",
  argTypes: {
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
    onchange: {
      action: "onchange",
    },
  },
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
};
export default meta;

type Story = StoryObj;

export const Property: Story = {};

export const Attribute: Story = {
  render: (args) =>
    html`<sp-checkbox
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox>`,
};

export const AttributeHTML: Story = {
  render: (args) =>
    html`<sp-checkbox
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox>`,
};

export const Form: Story = {
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <sp-checkbox
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></sp-checkbox>
      <input type="reset" />
      <input type="submit" />
    </form>
  `,
};
