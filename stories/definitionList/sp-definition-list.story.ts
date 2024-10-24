import "../../src/components/definitionList/sp-definition-list-dt";
import "../../src/components/definitionList/sp-definition-list-dd";
import "../../src/components/definitionList/sp-definition-list";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const DefinitionList = (termText: string, definitionText: string) => html`
  <sp-definition-list>
    <sp-definition-list-dt>${termText}</sp-definition-list-dt>
    <sp-definition-list-dd>${definitionText}</sp-definition-list-dd>
    <sp-definition-list-dt>${termText}</sp-definition-list-dt>
    <sp-definition-list-dd>${definitionText}</sp-definition-list-dd>
  </sp-definition-list>
`;

const meta: Meta = {
  args: {
    termText: "Term",
    definitionText: "Definition",
  },
  render: ({ termText, definitionText }) =>
    DefinitionList(termText, definitionText),
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};

export const OverflowWrap: Story = {
  args: {
    termText: "LongTermLongTermLongTermLongTerm",
    definitionText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
