import "../../src/components/definitionList/sp-definition-list-dd";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { SpDefinitionListDd } from "../../src/components/definitionList/sp-definition-list-dd";

type StoryArgs = SpDefinitionListDd & {
  text: string;
};

const meta = {
  component: "sp-definition-list-dd",
  args: {
    text: "Text",
  },
  render: ({ text }) =>
    `<sp-definition-list-dd>${text}</sp-definition-list-dd>`,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
  tags: ["!dev-only"],
};
