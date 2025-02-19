import "../../src/components/button/sp-button";
import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/notificationBar/sp-notification-bar";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpNotificationBar } from "../../src/components/notificationBar/sp-notification-bar";

const meta = {
  component: "sp-notification-bar",
} satisfies Meta<SpNotificationBar>;

export default meta;
type Story = StoryObj<SpNotificationBar>;

export const Basic: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <sp-notification-bar type="error">Hello World</sp-notification-bar>
      <sp-notification-bar type="information">Hello World</sp-notification-bar>
      <sp-notification-bar type="success">Hello World</sp-notification-bar>
      <sp-notification-bar type="warning">Hello World</sp-notification-bar>
    </div>
  `,
};

export const LongText: Story = {
  render: () => html`
    <sp-notification-bar>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </sp-notification-bar>
  `,
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
