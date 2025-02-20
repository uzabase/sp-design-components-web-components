import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/button/sp-button";
import "../../src/components/sectionTitle/sp-section-title";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-section-title",
  argTypes: {
    text: { type: "string" },
  },
  args: {
    text: "Section Title",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};

export const WithTextLinks: Story = {
  render: (args) => html`
    <sp-section-title text=${args.text}>
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
    </sp-section-title>
  `,
};

export const WithButtons: Story = {
  render: (args) => html`
    <sp-section-title text=${args.text}>
      <sp-button text="Button1" slot="buttons"></sp-button>
      <sp-button text="Button2" slot="buttons"></sp-button>
    </sp-section-title>
  `,
};

export const WithFullContents: Story = {
  render: (args) => html`
    <sp-section-title text=${args.text}>
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
    </sp-section-title>
  `,
};
