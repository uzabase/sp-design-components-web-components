import "../../src/components/segmentedControl/sp-segmented-control";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";
import { action } from "@storybook/addon-actions";
import { SpSegmentedControl } from "../../src/components/segmentedControl/sp-segmented-control";

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
  component: "sp-segmented-control",
  argTypes: {
    name: { type: "string" },
    data: { type: "string" },
    onchange: {
      action: "onchange",
    },
  },
  args: {
    name: "sp-segmented-control-name",
    data: data,
    onchange: action("onchange"),
  },
} satisfies Meta<SpSegmentedControl>;

export default meta;
type Story = StoryObj<SpSegmentedControl>;

export const Basic: Story = {
  tags: ["!dev-only"],
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
            <sp-segmented-control
              json-data=${JSON.stringify([{ text: "text" }])}
            ></sp-segmented-control>
          </td>
          <td>
            <sp-segmented-control
              json-data=${JSON.stringify([{ text: "text", checked: true }])}
            ></sp-segmented-control>
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <sp-segmented-control
              json-data=${JSON.stringify([{ text: "text", disabled: true }])}
            ></sp-segmented-control>
          </td>
          <td style="background: #ccc">
            <sp-segmented-control
              json-data=${JSON.stringify([
                { text: "text", checked: true, disabled: true },
              ])}
            ></sp-segmented-control>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};

export const Sandbox: Story = {
  args: {
    direction: undefined,
  },
  decorators: [
    (story) => html`
      <fieldset aria-labelledby="legend1" style="min-inline-size: auto;">
        <legend id="legend1">らじおぐるーぷ</legend>
        ${story()}
      </fieldset>
      <fieldset>
        <legend>aaa</legend>
        よこにもじ
        <sp-segmented-control
          json-data=${JSON.stringify([
            { text: "text", checked: false },
            { text: "text", checked: true },
            { text: "text", checked: false },
          ])}
        ></sp-segmented-control>
      </fieldset>
      <p>親がflex</p>
      <div style="display: flex;">${story()}</div>
      <sp-segmented-control
        json-data=${JSON.stringify([
          { text: "text", checked: false },
          { text: "text", checked: true },
          { text: "text", checked: false },
        ])}
      ></sp-segmented-control>
    `,
  ],
};
