import "../../src/components/elementTitle/sp-element-title";
import "../../src/components/button/sp-button";
import "@sp-design/token/lib/speeda-tokens.css";
import { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "ElementTitle/sp-element-title",
  component: "sp-element-title",
  argTypes: {
    text: { type: "string" },
  },
  args: {
    text: "Element Title",
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
