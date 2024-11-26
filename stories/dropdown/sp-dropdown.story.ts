import "../../src/components/dropdown/sp-dropdown";

import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const meta: Meta = {
  args: {},
  render: (args) => html`
    <sp-dropdown select-type=${args.selectType}>
      <sp-dropdown-option> iii </sp-dropdown-option>
    </sp-dropdown>
  `,
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
