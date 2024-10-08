import "../../src/components/definitionList/sp-definition-list-dd";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";

const meta: Meta = {
  component: "sp-definition-list-dd",
  argTypes: {
    text: { type: "string" },
  },
  args: {
    text: "Text",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
