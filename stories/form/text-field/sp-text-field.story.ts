import "../../../src/components/form/text-field/sp-text-field";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpTextField } from "../../../src/components/form/text-field/sp-text-field";

const meta = {
  component: "sp-text-field",
  argTypes: {
    value: { type: "string" },
    placeholder: { type: "string" },
    disabled: { type: "boolean" },
    name: { type: "string" },
    required: { type: "boolean" },
    type: {
      type: "string",
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search"],
    },
    autocomplete: { type: "string" },
    label: { type: "string" },
    orientation: {
      type: "string",
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
  render: (args) => html`
    <sp-text-field
      .value=${args.value ?? ""}
      placeholder=${args.placeholder ?? ""}
      ?disabled=${args.disabled}
      name=${args.name ?? ""}
      ?required=${args.required}
      type=${args.type ?? "text"}
      autocomplete=${args.autocomplete ?? ""}
      label=${args.label ?? ""}
      orientation=${args.orientation ?? "vertical"}
    ></sp-text-field>
  `,
} satisfies Meta<SpTextField>;

export default meta;
type Story = StoryObj<SpTextField>;

export const Basic: Story = {
  args: {
    value: "",
    placeholder: "テキストを入力",
    disabled: false,
    name: "basicField",
    required: false,
    autocomplete: "off",
  },
  tags: ["!dev-only"],
};

export const WithLabel: Story = {
  args: {
    label: "お名前",
    placeholder: "山田太郎",
    name: "nameField",
    autocomplete: "name",
  },
};

export const WithLabelRequired: Story = {
  args: {
    label: "メールアドレス",
    placeholder: "example@domain.com",
    name: "emailField",
    type: "email",
    required: true,
    autocomplete: "email",
  },
};

export const WithLabelAndForm: Story = {
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        alert(`送信データ: ${data.get("formText")}`);
      }}
      style="max-width: 400px;"
    >
      <sp-text-field
        label="お名前"
        name="formText"
        required
        placeholder="山田太郎"
        autocomplete="name"
      ></sp-text-field>
      <button type="submit" style="margin-top: 16px;">送信</button>
    </form>
  `,
};

export const Disabled: Story = {
  args: {
    label: "無効フィールド",
    disabled: true,
    value: "入力不可",
    placeholder: "disabled",
    name: "disabledField",
    autocomplete: "off",
  },
};

export const WithCharacterCounter: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-text-field
        label="コメント"
        name="comment"
        placeholder="50文字以内でコメントを入力"
        character-limit="50"
        value="文字数カウンター付きのテキストフィールドです"
        autocomplete="off"
      ></sp-text-field>
      <sp-text-field
        label="文字数オーバー例"
        name="shortText"
        placeholder="10文字以内で入力"
        character-limit="10"
        value="この文章は10文字を超えています"
        autocomplete="off"
      ></sp-text-field>
    </div>
  `,
};
export const ErrorStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-text-field
        label="単一エラー"
        name="email"
        placeholder="メールアドレスを入力"
        type="email"
        value="invalid-email"
        autocomplete="email"
      >
        <sp-error-text slot="error-text"
          >メールアドレスの形式が正しくありません</sp-error-text
        >
      </sp-text-field>
      <sp-text-field
        label="複数エラー + 文字数カウンター"
        name="password"
        placeholder="パスワードを入力"
        type="password"
        character-limit="20"
        value="123"
        autocomplete="new-password"
      >
        <sp-error-text slot="error-text"
          >パスワードは8文字以上で入力してください</sp-error-text
        >
        <sp-error-text slot="error-text"
          >大文字・小文字・数字を含めてください</sp-error-text
        >
        <sp-error-text slot="error-text"
          >特殊文字(@, #, $など)を含めてください</sp-error-text
        >
      </sp-text-field>
    </div>
  `,
};
export const InputTypes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;"
    >
      <sp-text-field
        label="メールアドレス"
        name="email"
        type="email"
        placeholder="example@domain.com"
        autocomplete="email"
      ></sp-text-field>
      <sp-text-field
        label="パスワード"
        name="password"
        type="password"
        placeholder="パスワードを入力"
        autocomplete="current-password"
      ></sp-text-field>
      <sp-text-field
        label="電話番号"
        name="phone"
        type="tel"
        placeholder="090-1234-5678"
        autocomplete="tel"
      ></sp-text-field>
    </div>
  `,
};

export const OrientationVertical: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-text-field
        label="お名前"
        placeholder="山田太郎"
        name="nameVerticalShort"
        orientation="vertical"
        autocomplete="name"
      ></sp-text-field>

      <sp-text-field
        label="とても長いラベルテキストの例です。このラベルは複数行にわたって表示される可能性があり、レイアウトがどのように調整されるかを確認するためのものです。"
        placeholder="長いラベルのテスト"
        name="nameVerticalLong"
        orientation="vertical"
        autocomplete="off"
      ></sp-text-field>
    </div>
  `,
};

export const OrientationHorizontal: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;"
    >
      <sp-text-field
        label="お名前"
        placeholder="山田太郎"
        name="nameHorizontalShort"
        orientation="horizontal"
        autocomplete="name"
      ></sp-text-field>

      <sp-text-field
        label="とても長いラベルテキストの例です。このラベルは複数行にわたって表示される可能性があり、レイアウトがどのように調整されるかを確認するためのものです。横レイアウトでの改行挙動をテストします。"
        placeholder="長いラベルのテスト"
        name="nameHorizontalLong"
        orientation="horizontal"
        autocomplete="off"
      ></sp-text-field>
    </div>
  `,
};
