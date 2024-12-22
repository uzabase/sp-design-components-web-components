import "../../src/components/notificationMessage/sp-notification-message";
import "../../src/components/button/sp-button";
import "@sp-design/token/lib/speeda-tokens.css";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-notification-message",
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <sp-notification-message variant="error"
        >Hello World</sp-notification-message
      >
      <sp-notification-message variant="info"
        >Hello World</sp-notification-message
      >
      <sp-notification-message variant="success"
        >Hello World</sp-notification-message
      >
      <sp-notification-message variant="warning"
        >Hello World</sp-notification-message
      >
    </div>
  `,
};

export const MultipleLines: Story = {
  render: () => html`
    <sp-notification-message variant="error">
      <p style="margin: 0">表示可能な検索結果は1,000件です</p>
      <p style="margin: 0">
        キーワードを変更するか誤字脱字がないか確認してください
      </p>
    </sp-notification-message>
  `,
};
