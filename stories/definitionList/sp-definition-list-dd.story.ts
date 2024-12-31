import "../../src/components/definitionList/sp-definition-list-dd";
import "@sp-design/token/lib/speeda-tokens.css";

import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  component: "sp-definition-list-dd",
  args: {
    text: "Text",
  },
  render: ({ text }) =>
    `<sp-definition-list-dd>${text}</sp-definition-list-dd>`,
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
