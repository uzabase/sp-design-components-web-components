import "../../src/components/button/sp-button";
import "../../src/components/notificationMessage/sp-notification-message";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpNotificationMessage } from "../../src/components/notificationMessage/sp-notification-message";

const meta = {
  component: "sp-notification-message",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["error", "warning", "information", "success"],
      description: "通知の種類",
      defaultValue: "information",
    },
    slot: {
      control: { type: "text" },
      description: "通知メッセージのコンテンツ",
      defaultValue: "Hello World",
    },
  },
  args: {
    type: "information",
    slot: "Hello World",
  },
  render: (args) => html`
    <sp-notification-message type=${args.type}>
      ${args.slot}
    </sp-notification-message>
  `,
} satisfies Meta<SpNotificationMessage>;

export default meta;
type Story = StoryObj<SpNotificationMessage>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <sp-notification-message type="error">Hello World</sp-notification-message>
      <sp-notification-message type="information">Hello World</sp-notification-message>
      <sp-notification-message type="success">Hello World</sp-notification-message>
      <sp-notification-message type="warning">Hello World</sp-notification-message>
    </div>
  `,
};

export const LongText: Story = {
  render: () => html`
    <sp-notification-message>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </sp-notification-message>
  `,
};

export const MultipleParagraphs: Story = {
  render: () => html`
    <sp-notification-message type="error">
      <p style="margin: 0">表示可能な検索結果は1,000件です</p>
      <p style="margin: 0">
        キーワードを変更するか誤字脱字がないか確認してください
      </p>
    </sp-notification-message>
  `,
};
