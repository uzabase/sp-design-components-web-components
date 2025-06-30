import "../../src/components/definitionList/sp-definition-list-dt";
import "../../src/components/definitionList/sp-definition-list-dd";
import "../../src/components/definitionList/sp-definition-list";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpDefinitionList } from "../../src/components/definitionList/sp-definition-list";

type StoryArgs = SpDefinitionList & {
  termText: string;
  definitionText: string | ReturnType<typeof html>;
};

const meta = {
  args: {
    termText: "Term",
    definitionText: "Definition",
  },
  render: ({ termText, definitionText }) => html`
    <sp-definition-list>
      <sp-definition-list-dt>${termText}</sp-definition-list-dt>
      <sp-definition-list-dd>${definitionText}</sp-definition-list-dd>
      <sp-definition-list-dt>${termText}</sp-definition-list-dt>
      <sp-definition-list-dd>${definitionText}</sp-definition-list-dd>
    </sp-definition-list>
  `,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const OverflowWrap: Story = {
  args: {
    termText: "LongTermLongTermLongTermLongTerm",
    definitionText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};

export const Break: Story = {
  args: {
    definitionText: html`break <br />break`,
  },
};
