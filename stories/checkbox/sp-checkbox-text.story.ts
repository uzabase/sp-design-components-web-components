import "../../src/components/checkbox/sp-checkbox-text";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";
import { action } from "@storybook/addon-actions";

const meta: Meta = {
  component: "sp-checkbox-text",
  argTypes: {
    text: { type: "string" },
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
    text: "sp-checkbox-text-text",
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    checked: undefined,
    indeterminate: undefined,
    disabled: undefined,
  },
};

export const Property: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
  render: (args) =>
    html`<sp-checkbox-text
      text=${args.text}
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-text>`,
};

export const AttributeHTML: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
  render: (args) =>
    html`<sp-checkbox-text
      text=${args.text}
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-text>`,
};

export const Form: Story = {
  args: {
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
  },
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <sp-checkbox-text
        .text=${args.text}
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></sp-checkbox-text>
      <input type="reset" />
      <input type="submit" />
    </form>
  `,
};
