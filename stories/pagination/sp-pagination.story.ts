import "../../src/components/pagination/sp-pagination";
import "@sp-design/token/lib/speeda-tokens.css";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpPagination } from "../../src/components/pagination/sp-pagination";

const meta = {
  component: "sp-pagination",
  argTypes: {
    total: { control: "number" },
    selected: { control: "number" },
  },
  render: (args) => html`
    <sp-pagination total="${args.total}" selected="${args.selected}">
    </sp-pagination>
  `,
} satisfies Meta<SpPagination>;

export default meta;
type Story = StoryObj<SpPagination>;

export const Basic: Story = {
  args: { total: 10, selected: 1 },
  tags: ["!dev-only"],
};

export const ManyPages: Story = {
  args: { total: 20, selected: 10 },
};

export const OnePage: Story = {
  args: { total: 1, selected: 1 },
};

export const InvalidTotal: Story = {
  args: { total: 0, selected: 1 },
};

export const SelectedMoreThanTotal: Story = {
  args: { total: 5, selected: 10 },
};
