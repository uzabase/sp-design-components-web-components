import "../../../src/components/form/text-field/sp-text-field";
import "../../../src/components/form/label/sp-label";

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
      <div>
        <sp-label for="form-text-field">お名前</sp-label>
        <sp-text-field
          id="form-text-field"
          name="formText"
          required
          placeholder="山田太郎"
          autocomplete="name"
        ></sp-text-field>
      </div>
      <button type="submit">送信</button>
    </form>
  `,
};

export const Disabled: Story = {
  args: {
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
      <div>
        <sp-label for="comment-field">コメント</sp-label>
        <sp-text-field
          id="comment-field"
          name="comment"
          placeholder="50文字以内でコメントを入力"
          character-limit="50"
          value="文字数カウンター付きのテキストフィールドです"
          autocomplete="off"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="limit-exceeded">文字数オーバー例</sp-label>
        <sp-text-field
          id="limit-exceeded"
          name="shortText"
          placeholder="10文字以内で入力"
          character-limit="10"
          value="この文章は10文字を超えています"
          autocomplete="off"
        ></sp-text-field>
      </div>
    </div>
  `,
};
export const ErrorStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="single-error-field">単一エラー</sp-label>
        <sp-text-field
          id="single-error-field"
          name="email"
          placeholder="メールアドレスを入力"
          type="email"
          value="invalid-email"
        >
          <sp-error-text slot="error-text"
            >メールアドレスの形式が正しくありません</sp-error-text
          >
        </sp-text-field>
      </div>
      <div>
        <sp-label for="multiple-error-field"
          >複数エラー + 文字数カウンター</sp-label
        >
        <sp-text-field
          id="multiple-error-field"
          name="password"
          placeholder="パスワードを入力"
          type="password"
          character-limit="20"
          value="123"
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
    </div>
  `,
};
export const InputTypes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;"
    >
      <div>
        <sp-label for="email-field">メールアドレス</sp-label>
        <sp-text-field
          id="email-field"
          name="email"
          type="email"
          placeholder="example@domain.com"
          autocomplete="email"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="password-field">パスワード</sp-label>
        <sp-text-field
          id="password-field"
          name="password"
          type="password"
          placeholder="パスワードを入力"
          autocomplete="current-password"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="tel-field">電話番号</sp-label>
        <sp-text-field
          id="tel-field"
          name="phone"
          type="tel"
          placeholder="090-1234-5678"
          autocomplete="tel"
        ></sp-text-field>
      </div>
    </div>
  `,
};
