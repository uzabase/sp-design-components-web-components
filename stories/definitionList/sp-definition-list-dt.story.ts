import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/definitionList/sp-definition-list-dt";

import type { Meta, StoryObj } from "@storybook/web-components";

import type { SpDefinitionListDt } from "../../src/components/definitionList/sp-definition-list-dt";

type StoryArgs = SpDefinitionListDt & {
  text: string;
};

const meta = {
  component: "sp-definition-list-dt",
  args: {
    text: "Label",
  },
  render: ({ text }) =>
    `<sp-definition-list-dt>${text}</sp-definition-list-dt>`,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
  tags: ["!dev-only"],
};
