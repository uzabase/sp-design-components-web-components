import "../../src/components/definitionList/sp-definition-list-dt";
import "@sp-design/token/lib/speeda-tokens.css";

import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  component: "sp-definition-list-dt",
  args: {
    text: "Label",
  },
  render: ({ text }) =>
    `<sp-definition-list-dt>${text}</sp-definition-list-dt>`,
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
