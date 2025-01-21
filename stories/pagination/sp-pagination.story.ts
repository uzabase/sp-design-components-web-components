import "../../src/components/pagination/sp-pagination";
import "@sp-design/token/lib/speeda-tokens.css";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpPagination } from "../../src/components/pagination/sp-pagination";

const meta: Meta = {
  component: "sp-pagination",
  args: { total: 10, selected: 1 },
} satisfies Meta<SpPagination>;

export default meta;
type Story = StoryObj<SpPagination>;

export const Basic: Story = {};

export const ManyPages: Story = {
  render: () => html`<sp-pagination total="20" selected="10"></sp-pagination>`,
};

export const OnePage: Story = {
  render: () => html`<sp-pagination total="1" selected="1"></sp-pagination>`,
};

export const InvalidTotal: Story = {
  render: () => html`<sp-pagination total="0" selected="1"></sp-pagination>`,
};

export const InvalidSelected: Story = {
  render: () => html`<sp-pagination total="5" selected="10"></sp-pagination>`,
};
