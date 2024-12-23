import "../../src/components/button/sp-button";
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html } from "lit";
import "yakuhanjp/dist/css/yakuhanjp_s.css";

const meta: Meta = {
  component: "sp-button",
  argTypes: {
    text: { type: "string" },
    type: {
      control: { type: "select" },
      options: ["normal", "danger"],
    },
    hierarchy: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "large", "xLarge"],
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
  },
  args: {
    text: "sp-button-text",
    icon: "",
    type: "normal",
    hierarchy: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    type: undefined,
    hierarchy: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
  },
};

export const Property: Story = {};

export const Attribute: Story = {
  render: (args) =>
    html`<sp-button
      text=${args.text}
      icon=${args.icon}
      type=${args.type}
      hierarchy=${args.hierarchy}
      size=${args.size}
      loading=${args.loading}
      disabled=${args.disabled}
    ></sp-button>`,
};

export const AttributeHTML: Story = {
  render: (args) =>
    html`<sp-button
      text=${args.text}
      icon=${args.icon}
      type=${args.type}
      hierarchy=${args.hierarchy}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
    ></sp-button>`,
};

export const OverflowWrap: Story = {
  render: () => html`
    <p style="overflow-wrap: anywhere;">
      texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
    </p>
    <div>
      <sp-button text="text" style="width: 100%;"></sp-button>
    </div>
    <sp-button text="text"></sp-button>
    <sp-button text="text"></sp-button>
    <sp-button
      text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
    ></sp-button>
    <sp-button
      text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
    ></sp-button>
    <sp-button
      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ></sp-button>
    <sp-button
      text="にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご"
    ></sp-button>
    <div style="display: flex; min-width: 0;">
      <div>サンプルdiv</div>
      <sp-button
        text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
      ></sp-button>
    </div>
    <div style="display: flex; min-width: 0;">
      <div>サンプルdiv</div>
      <sp-button
        text="texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext"
      ></sp-button>
    </div>
  `,
};

export const ALL: Story = {
  render: () => html`
    <table>
      <caption>
        size: medium
      </caption>
      <thead>
        <tr>
          <th></th>
          <th colspan="3">normal</th>
          <th colspan="3">danger</th>
        </tr>
        <tr>
          <th>hierarchy</th>
          <th>primary</th>
          <th>secondary</th>
          <th>tertiary</th>
          <th>primary</th>
          <th>secondary</th>
          <th>tertiary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>state: default</th>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="primary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="secondary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="tertiary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="primary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="secondary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="tertiary"
            ></sp-button>
          </td>
        </tr>
        <tr>
          <th>state: disabled</th>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="primary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="secondary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="tertiary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="primary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="secondary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="tertiary"
              disabled
            ></sp-button>
          </td>
        </tr>
        <tr>
          <th>state: loading</th>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="primary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="secondary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="normal"
              hierarchy="tertiary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="primary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="secondary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="medium"
              type="danger"
              hierarchy="tertiary"
              loading
            ></sp-button>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <caption>
        size: large
      </caption>
      <thead>
        <tr>
          <th></th>
          <th colspan="3">normal</th>
          <th colspan="3">danger</th>
        </tr>
        <tr>
          <th>state</th>
          <th>primary</th>
          <th>secondary</th>
          <th>tertiary</th>
          <th>primary</th>
          <th>secondary</th>
          <th>tertiary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>state: default</th>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="primary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="secondary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="tertiary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="primary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="secondary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="tertiary"
            ></sp-button>
          </td>
        </tr>
        <tr>
          <th>state: disabled</th>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="primary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="secondary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="tertiary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="primary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="secondary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="tertiary"
              disabled
            ></sp-button>
          </td>
        </tr>
        <tr>
          <th>state: loading</th>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="primary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="secondary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="normal"
              hierarchy="tertiary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="primary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="secondary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="large"
              type="danger"
              hierarchy="tertiary"
              loading
            ></sp-button>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <caption>
        size: medium
      </caption>
      <thead>
        <tr>
          <th></th>
          <th colspan="3">normal</th>
          <th colspan="3">danger</th>
        </tr>
        <tr>
          <th>state</th>
          <th>primary</th>
          <th>secondary</th>
          <th>tertiary</th>
          <th>primary</th>
          <th>secondary</th>
          <th>tertiary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>state: default</th>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="primary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="secondary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="tertiary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="primary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="secondary"
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="tertiary"
            ></sp-button>
          </td>
        </tr>
        <tr>
          <th>state: disabled</th>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="primary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="secondary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="tertiary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="primary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="secondary"
              disabled
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="tertiary"
              disabled
            ></sp-button>
          </td>
        </tr>
        <tr>
          <th>state: loading</th>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="primary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="secondary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="normal"
              hierarchy="tertiary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="primary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="secondary"
              loading
            ></sp-button>
          </td>
          <td>
            <sp-button
              text="text"
              size="xLarge"
              type="danger"
              hierarchy="tertiary"
              loading
            ></sp-button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};
