import "../../src/components/tab/sp-tab-group";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTabGroup } from "../../src/components/tab/sp-tab-group";

const meta = {
  component: "sp-tab-group",
  argTypes: {},
  args: {},
  render: () => html`
    <sp-tab-group default-panel="">
      <sp-tab slot="nav" panel="jpn" fill="gray">jpn</sp-tab>
      <sp-tab slot="nav" panel="us" fill="gray">us</sp-tab>
      <sp-tab slot="nav" panel="cn" fill="gray">cn</sp-tab>
      <sp-tab slot="nav" panel="disabled" fill="gray" disabled>disabled</sp-tab>
      <sp-tab-panel slot="panel" name="jpn">
        <h3>日本のパネル</h3>
        <p>これは日本のパネルです。</p>
      </sp-tab-panel>
      <sp-tab-panel slot="panel" name="us">
        <h3>アメリカのパネル</h3>
        <p>これはアメリカのパネルです。</p>
      </sp-tab-panel>
      <sp-tab-panel slot="panel" name="cn">
        <h3>中国のパネル</h3>
        <p>これは中国のパネルです。</p>
      </sp-tab-panel>
      <sp-tab-panel slot="panel" name="disabled">
        <h3>無効なパネル</h3>
        <p>このタブは無効化されています。</p>
      </sp-tab-panel>
    </sp-tab-group>
  `,
} satisfies Meta<SpTabGroup>;

export default meta;

type Story = StoryObj<SpTabGroup>;

export const Basic: Story = {
  tags: ["!dev-only"],
};
