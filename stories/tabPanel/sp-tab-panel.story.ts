import "../../src/components/tab/sp-tab-panel";

import { html } from "lit";

const meta = {
  component: "sp-tab-panel",
  argTypes: {},
  args: {},
  render: () => html`
    <sp-tab-panel active>
      <p>パネルだよ</p>
    </sp-tab-panel>
  `,
};
export default meta;

export const Basic = {
  tags: ["!dev-only"],
};

export const WithoutActive = {
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

export const WithName = {
  render: () => html`
    <sp-tab-panel name="test-panel" active>
      <h3>名前付きパネル</h3>
      <p>name="test-panel"のパネルです</p>
    </sp-tab-panel>
  `,
};
