import "../../src/components/elementTitle/sp-element-title";
import { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  component: "sp-element-title",
  argTypes: {
    text: { type: "string" },
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    text: "タイトル",
  },
};
