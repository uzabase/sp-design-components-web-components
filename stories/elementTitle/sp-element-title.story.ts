import "../../src/components/elementTitle/sp-element-title";
import "../../src/components/button/sp-button";
import "@sp-design/token/lib/speeda-tokens.css";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-element-title",
  argTypes: {
    text: { type: "string" },
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    text: "Element Title",
  },
};

export const WithTextLinks: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
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
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
      <sp-button text="Button1" slot="buttons"></sp-button>
      <sp-button text="Button2" slot="buttons"></sp-button>
    </sp-element-title>
  `,
};

export const WithFullContents: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
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
