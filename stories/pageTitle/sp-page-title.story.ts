import "../../src/components/pageTitle/sp-page-title";

import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  component: "sp-page-title",
  argTypes: {
    text: { type: "string" },
  },
  args: {
    text: "Page Title",
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {};
