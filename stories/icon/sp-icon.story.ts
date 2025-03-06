import "../../src/components/icon/sp-icon";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import { speedaIconTypes } from "../../src/components/icon/icons";
import type { SpIcon } from "../../src/components/icon/sp-icon";

const meta = {
  component: "sp-icon",
  argTypes: {
    text: { type: "string" },
    type: {
      control: { type: "select" },
      options: speedaIconTypes,
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
  },
  args: {
    text: "sp-icon-text",
    type: "edit",
    size: "medium",
  },
} satisfies Meta<SpIcon>;

export default meta;
type Story = StoryObj<SpIcon>;

export const Basic: Story = {
  args: {
    text: undefined,
    size: undefined,
  },
  tags: ["!dev-only"],
};

export const Property: Story = {};

export const Attribute: Story = {
  render: (args) =>
    html`<sp-icon
      text=${args.text}
      type=${args.type}
      size=${args.size}
    ></sp-icon>`,
};

export const ALL: Story = {
  render: () => {
    return html`
      ${speedaIconTypes.map(
        (type) => html`
          <sp-icon text="${type}のアイコン" type="${type}"></sp-icon>
          <sp-icon
            text="${type}のアイコン"
            type="${type}"
            size="small"
          ></sp-icon>
        `,
      )}
    `;
  },
};

export const WithString: Story = {
  decorators: [
    (story) => html`
      ${story()}
      <span style="font-size:12px;">もじ</span>
      <div style="display: flex;align-items: center;">
        ${story()}
        <span style="font-size:12px;">もじ</span>
      </div>
    `,
  ],
};
