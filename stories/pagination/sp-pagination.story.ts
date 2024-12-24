import "../../src/components/pagination/sp-pagination";
import "@sp-design/token/lib/speeda-tokens.css";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-pagination",
  argTypes: {
    text: { type: "string" },
  },
  args: {
    text: "Pagination",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => html`<sp-pagination total="10" current="1"></sp-pagination>`,
};

export const ManyPages: Story = {
  render: () => html`<sp-pagination total="20" current="10"></sp-pagination>`,
};
