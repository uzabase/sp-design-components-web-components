import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/notificationBar/sp-notification-bar";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import type { SpNotificationBar } from "../../src/components/notificationBar/sp-notification-bar";

const meta = {
  component: "sp-notification-bar",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["error", "information", "success", "warning"],
    },
    slot: { type: "string" },
  },
  render: (args) => html`
    <sp-notification-bar type=${ifDefined(args.type)}>
      ${args.slot}
    </sp-notification-bar>
  `,
} satisfies Meta<SpNotificationBar>;

export default meta;
type Story = StoryObj<SpNotificationBar>;

export const Basic: Story = {
  args: {
    slot: "Hello World",
  },
  tags: ["!dev-only"],
};

export const AllTypes: Story = {
  args: {
    slot: "Hello World",
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <sp-notification-bar type="error">${args.slot}</sp-notification-bar>
      <sp-notification-bar type="information">${args.slot}</sp-notification-bar>
      <sp-notification-bar type="success">${args.slot}</sp-notification-bar>
      <sp-notification-bar type="warning">${args.slot}</sp-notification-bar>
    </div>
  `,
};

export const LongText: Story = {
  args: {
    slot: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};

export const MultipleParagraphs: Story = {
  render: () => html`
    <sp-notification-bar type="error">
      <p style="margin: 0">表示可能な検索結果は1,000件です</p>
      <p style="margin: 0">
        キーワードを変更するか誤字脱字がないか確認してください
      </p>
    </sp-notification-bar>
  `,
};
