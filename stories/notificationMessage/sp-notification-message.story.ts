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
    <sp-notification-message>Hello World</sp-notification-message>
  `,
};
