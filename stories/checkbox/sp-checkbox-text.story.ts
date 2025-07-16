import "../../src/components/checkbox/sp-checkbox-text";

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpCheckboxText } from "../../src/components/checkbox/sp-checkbox-text";

const meta = {
  component: "sp-checkbox-text",
  argTypes: {
    slot: { type: "string" },
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
    onchange: { action: "onchange" },
  },
  args: {
    slot: "sp-checkbox-text-text",
    value: "sp-checkbox-text-value",
    name: "sp-checkbox-text-name",
    checked: false,
    indeterminate: false,
    disabled: false,
    onchange: action("onchange"),
  },
  render: (args) => html`
    <sp-checkbox-text
      value=${args.value}
      name=${args.name}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.onchange}
    >
      ${args.slot}
    </sp-checkbox-text>
  `,
} satisfies Meta<SpCheckboxText>;

export default meta;
type Story = StoryObj<SpCheckboxText>;

export const Basic: Story = {
  tags: ["!dev-only"],
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
        .value=${args.value}
        .name=${args.name}
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        @change=${args.onchange}
      >
        ${args.slot}
      </sp-checkbox-text>
      <input type="reset" />
      <input type="submit" />
    </form>
  `,
};

export const OverflowWrap: Story = {
  render: () => html`
    <sp-checkbox-text>
      texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
    </sp-checkbox-text>
    <sp-checkbox-text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </sp-checkbox-text>
    <sp-checkbox-text>
      にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご
    </sp-checkbox-text>
    <div style="display: flex;">
      <div>サンプルdiv</div>
      <sp-checkbox-text>
        texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
      </sp-checkbox-text>
    </div>
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
          <td>
            <sp-checkbox-text>text</sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text checked>text</sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text indeterminate>text</sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text checked indeterminate> text </sp-checkbox-text>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <sp-checkbox-text disabled>text</sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text checked disabled>text</sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text indeterminate disabled> text </sp-checkbox-text>
          </td>
          <td>
            <sp-checkbox-text checked indeterminate disabled>
              text
            </sp-checkbox-text>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
