import "../../src/components/elementTitle/sp-element-title";
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

export const WithLinks: Story = {
  args: {
    text: "Element Title",
  },
  render: (args) => html`
    <sp-element-title .text=${args.text}>
      <a href="#" slot="links">Link 1</a>
      <a href="#" slot="links">Link 2</a>
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
        <a href="#" slot="links">Link 1</a>
        <a href="#" slot="links">Link 2</a>
        <button slot="buttons">Button 1</button>
        <button slot="buttons">Button 2</button>
      </sp-element-title>
    `,
  };
