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

export const ALL: Story = {
  render: (args) => html`
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
          <td>
            <sp-checkbox-text text="text"></sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text text="text" checked></sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text text="text" indeterminate></sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text
              text="text"
              checked
              indeterminate
            ></sp-checkbox-text>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <sp-checkbox-text text="text" disabled></sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text text="text" checked disabled></sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text
              text="text"
              indeterminate
              disabled
            ></sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text
              text="text"
              checked
              indeterminate
              disabled
            ></sp-checkbox-text>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
