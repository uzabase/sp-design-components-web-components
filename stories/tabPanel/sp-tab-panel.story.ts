import "../../src/components/tab/sp-tab-panel";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTabPanel } from "../../src/components/tab/sp-tab-panel";

const meta = {
  component: "sp-tab-panel",
  argTypes: {},
  args: {},
  render: () => html`
    <sp-tab-panel active>
      <p>パネルだよ</p>
    </sp-tab-panel>
  `,
} satisfies Meta<SpTabPanel>;
export default meta;

type Story = StoryObj<SpTabPanel>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const WithoutActive: Story = {
  render: () => html`
    <div>
      <h3>active属性なし（非表示）</h3>
      <sp-tab-panel>
        <p>この内容は表示されません</p>
      </sp-tab-panel>

      <h3>active属性あり（表示）</h3>
      <sp-tab-panel active>
        <p>この内容は表示されます</p>
      </sp-tab-panel>
    </div>
  `,
};

export const WithName: Story = {
  render: () => html`
    <sp-tab-panel name="test-panel" active>
      <h3>名前付きパネル</h3>
      <p>name="test-panel"のパネルです</p>
    </sp-tab-panel>
  `,
};
