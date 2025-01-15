import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/checkbox/sp-checkbox";

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpCheckbox } from "../../src/components/checkbox/sp-checkbox";

const meta = {
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
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
} satisfies Meta<SpCheckbox>;

export default meta;
type Story = StoryObj<SpCheckbox>;

export const Basic: Story = {
  args: {
    checked: undefined,
    indeterminate: undefined,
    disabled: undefined,
  },
  tags: ["!dev-only"],
};

export const Property: Story = {
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
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
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
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
  args: {
    value: "sp-checkbox-value",
    name: "sp-checkbox-name",
  },
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

export const ALL: Story = {
  render: () => html`
    <table>
      <thead>
        <tr>
          <td></td>
          <th>default</th>
          <th>checked</th>
          <th>indeterminate</th>
          <th>checked && indeterminate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>default</td>
          <td><sp-checkbox></sp-checkbox></td>
          <td><sp-checkbox checked></sp-checkbox></td>
          <td><sp-checkbox indeterminate></sp-checkbox></td>
          <td><sp-checkbox checked indeterminate></sp-checkbox></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td><sp-checkbox disabled></sp-checkbox></td>
          <td><sp-checkbox checked disabled></sp-checkbox></td>
          <td><sp-checkbox indeterminate disabled></sp-checkbox></td>
          <td><sp-checkbox checked indeterminate disabled></sp-checkbox></td>
        </tr>
      </tbody>
    </table>
  `,
};
