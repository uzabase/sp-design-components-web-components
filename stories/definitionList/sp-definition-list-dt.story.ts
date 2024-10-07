import "../../src/components/definitionList/sp-definition-list-dt";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";

const meta: Meta = {
  component: "sp-definition-list-dt",
  argTypes: {
    text: { type: "string" },
  },
  args: {
    text: "Label",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
