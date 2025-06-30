import "../../src/components/dropdownDialog/sp-dropdown-dialog";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpDropdownDialog } from "../../src/components/dropdownDialog/sp-dropdown-dialog";

const meta = {
  component: "sp-dropdown-dialog",
  argTypes: {},
  args: {},
} satisfies Meta<SpDropdownDialog>;

export default meta;
type Story = StoryObj<SpDropdownDialog>;

export const Basic: Story = {
  render: () => html`
    <sp-dropdown-dialog label="ダイアログを表示">
      <h1>ダイアログのタイトル</h1>
      ダイアログの内容
    </sp-dropdown-dialog>
  `,
  tags: ["!dev-only"],
};

export const LongText: Story = {
  render: () => html`
    <sp-dropdown-dialog label="検索式を表示">
      <h1>検索式</h1>
      <div>S001 FI：G08G1/16?</div>
      <div>S002 FI：B60W30?+B60W40?+B60W50?</div>
      <div>S003 FI：B60?+G01C21/?+G08G1/?+G05D1/?</div>
      <div>
        S004
        全文：?先進運転支援?+?高度運転支援?+?advanced?*?driver-assistance?*?systems?
      </div>
      <div>
        S005
        名称+要約+請求項：?自動運転?+?自動走行?+?自律運転?+?自律走行?+?オートクルーズ?+?衝突被害軽減?+?車間距離制御?+?アダプティブクルーズコントロール?+?アダプティブフロントライティング?+?車線維持支援?+?車線逸脱防止?+?車線逸脱警告?+?死角検出?+?死角検知?+?死角モニタ?+?クロストラフィックアラート?+?駐車支援?+?パーキングアシスト?+?トラフィックジャムアシスト?+?渋滞運転支援?+?ナイトビジョン?+?暗視?
      </div>
      <div>S006 名称+要約+請求項：[?自動?*?ブレーキ?,?制動?]W3</div>
      <div>
        S007 名称+要約+請求項：[?歩行者?,?標識?,?居眠?*?検知?,?検出?,?認識?]W3
      </div>
      <div>S008 名称+要約+請求項：[?前方?*?衝突?]W3</div>
      <div>
        S009 名称+要約+請求項：[?運転者?,?運転手?,?ドライバ?*?監視?,?モニタ?]W3
      </div>
      <div>S010 論理式：S001+S002+S003*(S004+S005+S006+S007+S008+S009)</div>
    </sp-dropdown-dialog>
  `,
};

export const RightPosition: Story = {
  render: () => html`
    <div style="display: flex; justify-content: end">
      <sp-dropdown-dialog label="ダイアログを表示" open position="right">
        <h1>ダイアログのタイトル</h1>
        ダイアログの内容
      </sp-dropdown-dialog>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <sp-dropdown-dialog label="ダイアログを表示" disabled></sp-dropdown-dialog>
  `,
};
