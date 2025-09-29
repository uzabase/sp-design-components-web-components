import "../../../src/components/form/select/sp-select";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpSelect } from "../../../src/components/form/select/sp-select";

const meta = {
  component: "sp-select",
  argTypes: {
    value: { type: "string" },
    disabled: { type: "boolean" },
    name: { type: "string" },
    required: { type: "boolean" },
    label: { type: "string" },
    orientation: {
      type: "string",
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
  render: (args) => html`
    <sp-select
      .value=${args.value ?? ""}
      ?disabled=${args.disabled}
      name=${args.name ?? ""}
      ?required=${args.required}
      label=${args.label ?? ""}
      orientation=${args.orientation ?? "vertical"}
    >
      <option value="">選択してください</option>
      <option value="option1">オプション1</option>
      <option value="option2">オプション2</option>
      <option value="option3">オプション3</option>
    </sp-select>
  `,
} satisfies Meta<SpSelect>;

export default meta;
type Story = StoryObj<SpSelect>;

export const Basic: Story = {
  args: {
    value: "",
    disabled: false,
    name: "basicSelect",
    required: false,
  },
  tags: ["!dev-only"],
};

export const WithLabel: Story = {
  args: {
    label: "都道府県",
    name: "prefecture",
  },
  render: (args) => html`
    <sp-select
      .value=${args.value ?? ""}
      ?disabled=${args.disabled}
      name=${args.name ?? ""}
      ?required=${args.required}
      label=${args.label ?? ""}
      orientation=${args.orientation ?? "vertical"}
    >
      <option value="">選択してください</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
      <option value="kyoto">京都府</option>
      <option value="kanagawa">神奈川県</option>
      <option value="saitama">埼玉県</option>
    </sp-select>
  `,
};

export const WithLabelRequired: Story = {
  args: {
    label: "職業",
    name: "occupation",
    required: true,
  },
  render: (args) => html`
    <sp-select
      .value=${args.value ?? ""}
      ?disabled=${args.disabled}
      name=${args.name ?? ""}
      ?required=${args.required}
      label=${args.label ?? ""}
      orientation=${args.orientation ?? "vertical"}
    >
      <option value="">選択してください</option>
      <option value="engineer">エンジニア</option>
      <option value="designer">デザイナー</option>
      <option value="manager">マネージャー</option>
      <option value="sales">営業</option>
      <option value="other">その他</option>
    </sp-select>
  `,
};

export const WithLabelAndForm: Story = {
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        alert(`選択された値: ${data.get("formSelect")}`);
      }}
      style="max-width: 400px;"
    >
      <sp-select label="お住まいの地域" name="formSelect" required>
        <option value="">選択してください</option>
        <option value="hokkaido">北海道</option>
        <option value="tohoku">東北</option>
        <option value="kanto">関東</option>
        <option value="chubu">中部</option>
        <option value="kansai">関西</option>
        <option value="chugoku">中国</option>
        <option value="shikoku">四国</option>
        <option value="kyushu">九州</option>
      </sp-select>
      <button type="submit" style="margin-top: 16px;">送信</button>
    </form>
  `,
};

export const Disabled: Story = {
  args: {
    label: "無効セレクト",
    disabled: true,
    value: "option1",
    name: "disabledSelect",
  },
};

export const ErrorStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-select label="必須項目" name="requiredSelect" required>
        <option value="">選択してください</option>
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
        <sp-error-text slot="error-text">この項目は必須です</sp-error-text>
      </sp-select>

      <sp-select label="複数エラー" name="multiErrorSelect" value="invalid">
        <option value="">選択してください</option>
        <option value="valid1">有効な選択肢1</option>
        <option value="valid2">有効な選択肢2</option>
        <sp-error-text slot="error-text"
          >無効な値が選択されています</sp-error-text
        >
        <sp-error-text slot="error-text"
          >有効な選択肢から選んでください</sp-error-text
        >
      </sp-select>
    </div>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-select label="年齢層" name="ageGroup">
        <option value="">選択してください</option>
        <option value="teens">10代</option>
        <option value="twenties">20代</option>
        <option value="thirties">30代</option>
        <option value="forties">40代</option>
        <option value="fifties">50代以上</option>
        <div slot="help-text">統計目的でのみ使用されます</div>
      </sp-select>

      <sp-select label="通知設定" name="notification" required>
        <option value="">選択してください</option>
        <option value="all">すべて受信</option>
        <option value="important">重要なもののみ</option>
        <option value="none">受信しない</option>
        <div slot="help-text">後から設定画面で変更できます</div>
        <sp-error-text slot="error-text"
          >通知設定を選択してください</sp-error-text
        >
      </sp-select>
    </div>
  `,
};

export const OrientationVertical: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-select
        label="カテゴリー"
        name="categoryVertical"
        orientation="vertical"
      >
        <option value="">選択してください</option>
        <option value="tech">テクノロジー</option>
        <option value="business">ビジネス</option>
        <option value="design">デザイン</option>
      </sp-select>

      <sp-select
        label="とても長いラベルテキストの例です。このラベルは複数行にわたって表示される可能性があり、レイアウトがどのように調整されるかを確認するためのものです。"
        name="longLabelVertical"
        orientation="vertical"
      >
        <option value="">選択してください</option>
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
      </sp-select>
    </div>
  `,
};

export const OrientationHorizontal: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;"
    >
      <sp-select
        label="カテゴリー"
        name="categoryHorizontal"
        orientation="horizontal"
      >
        <option value="">選択してください</option>
        <option value="tech">テクノロジー</option>
        <option value="business">ビジネス</option>
        <option value="design">デザイン</option>
      </sp-select>

      <sp-select
        label="とても長いラベルテキストの例です。このラベルは複数行にわたって表示される可能性があり、レイアウトがどのように調整されるかを確認するためのものです。横レイアウトでの改行挙動をテストします。"
        name="longLabelHorizontal"
        orientation="horizontal"
      >
        <option value="">選択してください</option>
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
      </sp-select>
    </div>
  `,
};
