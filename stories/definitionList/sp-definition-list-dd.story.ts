import "../../src/components/definitionList/sp-definition-list-dd";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpDefinitionListDd } from "../../src/components/definitionList/sp-definition-list-dd";

type StoryArgs = SpDefinitionListDd & {
  text: string;
};

const meta = {
  component: "sp-definition-list-dd",
  args: {
    text: "Text",
  },
  render: ({ text }) =>
    html`<sp-definition-list-dd>${text}</sp-definition-list-dd>`,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
  tags: ["!dev-only"],
};
