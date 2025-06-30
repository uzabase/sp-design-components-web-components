import "../../src/components/radio/sp-radio-button-text-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { SpRadioButtonTextGroup } from "../../src/components/radio/sp-radio-button-text-group";

const data = [
  {
    text: "text1",
    value: "value1",
    checked: false,
    disabled: false,
  },
  {
    text: "text2",
    checked: true,
  },
  {
    text: "text3",
    value: "value3",
    checked: false,
    disabled: true,
  },
  {
    text: "nagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitext space",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    text: "にほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーん",
  },
  {
    text: "ながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabled",
    disabled: true,
  },
];

const meta = {
  component: "sp-radio-button-text-group",
  argTypes: {
    name: { type: "string" },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    data: { type: "string" },
    onchange: {
      action: "onchange",
    },
  },
  args: {
    name: "sp-radio-button-text-group-name",
    direction: "horizontal",
    data: data,
    onchange: action("onchange"),
  },
} satisfies Meta<SpRadioButtonTextGroup>;

export default meta;
type Story = StoryObj<SpRadioButtonTextGroup>;

export const Basic: Story = {
  args: {
    name: undefined,
    direction: undefined,
  },
  tags: ["!dev-only"],
};

export const Attribute: Story = {
  args: {
    data: undefined,
  },
  render: (args) =>
    html`<sp-radio-button-text-group
      name=${args.name}
      direction=${args.direction}
      json-data=${JSON.stringify(data)}
      @change=${args.onchange}
    ></sp-radio-button-text-group>`,
};

export const Form: Story = {
  decorators: [
    (story) => html`
      <form action="" method="get">
        <label>
          <input type="radio" name="primitive-radio-group" value="primitive1" />
          <span>primitive1</span>
        </label>
        <label>
          <input type="radio" name="primitive-radio-group" value="primitive2" />
          <span>primitive2</span>
        </label>
        ${story()}
        <input type="reset" />
        <input type="submit" />
      </form>
    `,
  ],
};

export const OverflowWrap: Story = {
  decorators: [
    (story) => html`
      ${story()}
      <div style="display: flex;">
        <div>サンプルdiv</div>
        ${story()}
      </div>
    `,
  ],
};

export const ALL: Story = {
  render: () => html`
    <table>
      <thead>
        <tr>
          <td></td>
          <th>default</th>
          <th>checked</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>default</td>
          <td>
            <sp-radio-button-text-group
              json-data=${JSON.stringify([{ text: "text" }])}
            ></sp-radio-button-text-group>
          </td>
          <td>
            <sp-radio-button-text-group
              json-data=${JSON.stringify([{ text: "text", checked: true }])}
            ></sp-radio-button-text-group>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <sp-radio-button-text-group
              json-data=${JSON.stringify([{ text: "text", disabled: true }])}
            ></sp-radio-button-text-group>
          </td>
          <td>
            <sp-radio-button-text-group
              json-data=${JSON.stringify([
                { text: "text", checked: true, disabled: true },
              ])}
            ></sp-radio-button-text-group>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};

export const Sandbox: Story = {
  decorators: [
    (story) => html`
      <fieldset aria-labelledby="legend1" aria-invalid="true">
        <legend id="legend1">らじおぐるーぷ</legend>
        ${story()}
      </fieldset>
      <fieldset>
        <legend>らじおぐるーぷ２だよspanつき</legend>
        <ul role="radiogroup">
          <li style="list-style: none">
            <label>
              <span>email</span> <input type="radio" name="test" />
            </label>
          </li>
          <li style="list-style: none">
            <label> <span>abb</span> <input type="radio" name="test" /> </label>
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>IDでforするやつらじおぐるーぷ３だよspanつき</legend>
        <ul>
          <li style="list-style: none">
            <label for="idfor1">
              <span>email</span>
            </label>
            <input type="radio" name="test2" id="idfor1" />
          </li>
          <li style="list-style: none">
            <label for="idfor2">
              <span>abb</span>
            </label>
            <input type="radio" name="test2" id="idfor2" />
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>らじおぐるーぷ4だよspanなし</legend>
        <ul role="radiogroup">
          <li style="list-style: none">
            <label> email <input type="radio" name="test" /> </label>
          </li>
          <li style="list-style: none">
            <label> abb <input type="radio" name="test" /> </label>
          </li>
        </ul>
      </fieldset>
    `,
  ],
};
