import "../../src/components/elementTitle/sp-element-title";
import "../../src/components/button/sp-button";
import "../../src/components/icon/sp-icon";
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

export const WithHelpIcon: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
      <sp-icon type="help" slot="help-link"></sp-icon>
    </sp-element-title>
  `,
};

export const WithTextLinks: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
      <a href="#" slot="text-links">Link 1</a>
      <a href="#" slot="text-links">Link 2</a>
    </sp-element-title>
  `,
};

export const WithButtons: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
      <button slot="buttons">Button 1</button>
      <button slot="buttons">Button 2</button>
    </sp-element-title>
  `,
};

export const WithFullContents: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
      <sp-icon type="help" slot="help-link"></sp-icon>
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
