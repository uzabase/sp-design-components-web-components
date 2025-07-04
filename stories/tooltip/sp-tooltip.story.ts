import "../../src/components/tooltip/sp-tooltip";

import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Tooltip/SpTooltip",
  component: "sp-tooltip",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    placement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    zindex: { control: "text" },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: "短い！",
    placement: "top",
    zindex: "10",
  },
  render: (args) => `
    <sp-tooltip 
      label="${args.label}"
      placement="${args.placement}"
      zindex="${args.zindex}"
    >
      <button>ホバー</button>
    </sp-tooltip>
  `,
};
