import "../../src/components/button/sp-button";
import "../../src/components/elementTitle/sp-element-title";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpElementTitle } from "../../src/components/elementTitle/sp-element-title";

const meta = {
  component: "sp-element-title",
  argTypes: {
    slot: { type: "string" },
  },
  args: {
    slot: "Element Title",
  },
  render: (args) => html`<sp-element-title>${args.slot}</sp-element-title>`,
} satisfies Meta<SpElementTitle>;

export default meta;
type Story = StoryObj<SpElementTitle>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const WithTextLinks: Story = {
  render: (args) => html`
    <sp-element-title>
      ${args.slot}
      <a
        href="#"
        slot="text-links"
        style="font-size: 12px; color: var(--color-semantic-text-text-link);"
        >TextLink1</a
      >
      <a
        href="#"
        slot="text-links"
        style="font-size: 12px; color: var(--color-semantic-text-text-link);"
        >TextLink2</a
      >
    </sp-element-title>
  `,
};

export const WithButtons: Story = {
  render: (args) => html`
    <sp-element-title>
      ${args.slot}
      <sp-button text="Button1" slot="buttons"></sp-button>
      <sp-button text="Button2" slot="buttons"></sp-button>
    </sp-element-title>
  `,
};

export const WithFullContents: Story = {
  render: (args) => html`
    <sp-element-title>
      ${args.slot}
      <a
        href="#"
        slot="text-links"
        style="font-size: 12px; color: var(--color-semantic-text-text-link);"
        >TextLink1</a
      >
      <a
        href="#"
        slot="text-links"
        style="font-size: 12px; color: var(--color-semantic-text-text-link);"
        >TextLink2</a
      >
      <sp-button text="Button1" slot="buttons"></sp-button>
      <sp-button text="Button2" slot="buttons"></sp-button>
    </sp-element-title>
  `,
};
