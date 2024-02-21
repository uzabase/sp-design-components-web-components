import "../../src/components/checkbox/sp-checkbox-list";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";
import { action } from "@storybook/addon-actions";

const meta: Meta = {
  component: "sp-checkbox-list",
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
    text: "sp-checkbox-list-text",
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
    value: "sp-checkbox-list-value",
    name: "sp-checkbox-list-name",
  },
};

export const Attribute: Story = {
  args: {
    value: "sp-checkbox-list-value",
    name: "sp-checkbox-list-name",
  },
  render: (args) =>
    html`<sp-checkbox-list
      text=${args.text}
      value=${args.value}
      name=${args.name}
      checked=${args.checked}
      indeterminate=${args.indeterminate}
      disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-list>`,
};

export const AttributeHTML: Story = {
  args: {
    value: "sp-checkbox-list-value",
    name: "sp-checkbox-list-name",
  },
  render: (args) =>
    html`<sp-checkbox-list
      text=${args.text}
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    ></sp-checkbox-list>`,
};

export const Form: Story = {
  args: {
    value: "sp-checkbox-list-value",
    name: "sp-checkbox-list-name",
  },
  render: (args) => html`
    <form>
      <input type="checkbox" name=${args.name} value="primitive1" />
      <input type="checkbox" name=${args.name} value="primitive2" />
      <sp-checkbox-list
        .text=${args.text}
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      ></sp-checkbox-list>
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
          <td><sp-checkbox-list text="text"></sp-checkbox-list></td>
          <td><sp-checkbox-list text="text" checked></sp-checkbox-list></td>
          <td>
            <sp-checkbox-list text="text" indeterminate></sp-checkbox-list>
          </td>
          <td>
            <sp-checkbox-list
              text="text"
              checked
              indeterminate
            ></sp-checkbox-list>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td><sp-checkbox-list text="text" disabled></sp-checkbox-list></td>
          <td>
            <sp-checkbox-list text="text" checked disabled></sp-checkbox-list>
          </td>
          <td>
            <sp-checkbox-list
              text="text"
              indeterminate
              disabled
            ></sp-checkbox-list>
          </td>
          <td>
            <sp-checkbox-list
              text="text"
              checked
              indeterminate
              disabled
            ></sp-checkbox-list>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
