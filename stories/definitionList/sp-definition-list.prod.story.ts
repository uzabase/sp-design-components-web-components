import "../../src/components/definitionList/sp-definition-list-dt";
import "../../src/components/definitionList/sp-definition-list-dd";
import "../../src/components/definitionList/sp-definition-list";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { html } from "lit";

const meta: Meta = {
  title: "DefinitionList/sp-definition-list",
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
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {};
