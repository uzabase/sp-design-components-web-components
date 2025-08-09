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
    name: "",
    required: false,
  },
  tags: ["!dev-only"],
};

export const WithLabel: Story = {
  render: () => html`
    <sp-label for="sample-text-field">ラベル</sp-label>
    <sp-text-field
      id="sample-text-field"
      placeholder="ラベル付きテキストフィールド"
    ></sp-text-field>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        alert(data.get("formText"));
      }}
    >
      <sp-label for="form-text-field">フォーム用</sp-label>
      <sp-text-field
        id="form-text-field"
        name="formText"
        required
        placeholder="フォーム内テキスト"
      ></sp-text-field>
      <button type="submit">送信</button>
    </form>
  `,
};

export const Error: Story = {
  render: () => html`
    <sp-text-field>
      <sp-error-text slot="error-text">エラーが発生しています</sp-error-text>
    </sp-text-field>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "入力不可",
    placeholder: "disabled",
  },
};

export const VerticalLabelLayout: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;"
    >
      <div>
        <sp-label for="vertical-field-1" required>ラベル</sp-label>
        <sp-text-field
          id="vertical-field-1"
          placeholder="テキスト"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="vertical-field-2">ラベル</sp-label>
        <sp-text-field
          id="vertical-field-2"
          placeholder="テキスト"
        ></sp-text-field>
      </div>
    </div>
  `,
};

export const HorizontalLabel: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <sp-label
          for="horizontal-field-1"
          required
          style="width: 160px; flex-shrink: 0;"
          >ラベル</sp-label
        >
        <sp-text-field
          id="horizontal-field-1"
          placeholder="テキスト"
          style="flex: 1;"
        ></sp-text-field>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <sp-label for="horizontal-field-2" style="width: 160px; flex-shrink: 0;"
          >ラベル</sp-label
        >
        <sp-text-field
          id="horizontal-field-2"
          placeholder="テキスト"
          style="flex: 1;"
        ></sp-text-field>
      </div>
    </div>
  `,
};

export const WithCharacterCounter: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="counter-field-1" required>ラベル</sp-label>
        <sp-text-field
          id="counter-field-1"
          placeholder="テキスト"
          character-limit="20"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="counter-field-2">ラベル</sp-label>
        <sp-text-field
          id="counter-field-2"
          placeholder="テキスト"
          character-limit="50"
        ></sp-text-field>
      </div>
    </div>
  `,
};

export const CharacterLimitStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="normal-state">通常状態</sp-label>
        <sp-text-field
          id="normal-state"
          placeholder="5文字以内で入力"
          character-limit="5"
          value="abc"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="limit-reached">上限ぴったり</sp-label>
        <sp-text-field
          id="limit-reached"
          placeholder="5文字以内で入力"
          character-limit="5"
          value="abcde"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="limit-exceeded">文字数オーバー</sp-label>
        <sp-text-field
          id="limit-exceeded"
          placeholder="5文字以内で入力"
          character-limit="5"
          value="abcdefgh"
        ></sp-text-field>
      </div>
    </div>
  `,
};

export const ErrorWithCharacterCounter: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="error-normal">エラー + 通常カウンター</sp-label>
        <sp-text-field
          id="error-normal"
          placeholder="20文字以内で入力"
          character-limit="20"
          value="abc"
        >
          <sp-error-text slot="error-text"
            >エラーが発生しています</sp-error-text
          >
        </sp-text-field>
      </div>
      <div>
        <sp-label for="error-limit-reached">エラー + 上限ぴったり</sp-label>
        <sp-text-field
          id="error-limit-reached"
          placeholder="20文字以内で入力"
          character-limit="20"
          value="12345678901234567890"
        >
          <sp-error-text slot="error-text">この入力は必須です</sp-error-text>
        </sp-text-field>
      </div>
      <div>
        <sp-label for="error-limit-exceeded">エラー + 文字数オーバー</sp-label>
        <sp-text-field
          id="error-limit-exceeded"
          placeholder="20文字以内で入力"
          character-limit="20"
          value="123456789012345678901234567890"
        >
          <sp-error-text slot="error-text"
            >入力形式が正しくありません</sp-error-text
          >
        </sp-text-field>
      </div>
    </div>
  `,
};

export const DifferentInputTypes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="email-field">メールアドレス</sp-label>
        <sp-text-field
          id="email-field"
          type="email"
          placeholder="example@domain.com"
          autocomplete="email"
          name="email"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="password-field">パスワード</sp-label>
        <sp-text-field
          id="password-field"
          type="password"
          placeholder="パスワードを入力"
          autocomplete="current-password"
          name="password"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="tel-field">電話番号</sp-label>
        <sp-text-field
          id="tel-field"
          type="tel"
          placeholder="090-1234-5678"
          autocomplete="tel"
          name="phone"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="url-field">ウェブサイト</sp-label>
        <sp-text-field
          id="url-field"
          type="url"
          placeholder="https://example.com"
          autocomplete="url"
          name="website"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="search-field">検索</sp-label>
        <sp-text-field
          id="search-field"
          type="search"
          placeholder="検索キーワード"
          name="search"
        ></sp-text-field>
      </div>
    </div>
  `,
};

export const MultipleErrorMessages: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="single-error-field">単一エラー</sp-label>
        <sp-text-field
          id="single-error-field"
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
        <sp-label for="multiple-error-field">複数エラー</sp-label>
        <sp-text-field
          id="multiple-error-field"
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
      <div>
        <sp-label for="validation-error-field">バリデーション結果</sp-label>
        <sp-text-field
          id="validation-error-field"
          placeholder="ユーザー名を入力"
          value="ab"
          character-limit="50"
        >
          <sp-error-text slot="error-text"
            >ユーザー名は3文字以上で入力してください</sp-error-text
          >
          <sp-error-text slot="error-text"
            >このユーザー名は既に使用されています</sp-error-text
          >
        </sp-text-field>
      </div>
    </div>
  `,
};

export const DynamicErrorManagement: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="dynamic-field">動的エラー管理</sp-label>
        <sp-text-field
          id="dynamic-field"
          placeholder="入力してエラーを確認"
          @input=${(e: Event) => {
            const field = e.target as any;
            const value = field.value;

            // 既存のエラーをクリア
            const existingErrors = field.querySelectorAll(
              'sp-error-text[slot="error-text"]',
            );
            existingErrors.forEach((error: HTMLElement) => error.remove());

            // バリデーション
            const errors = [];
            if (value.length < 3) {
              errors.push("3文字以上で入力してください");
            }
            if (!/^[a-zA-Z0-9]+$/.test(value) && value.length > 0) {
              errors.push("英数字のみで入力してください");
            }
            if (value.toLowerCase().includes("admin")) {
              errors.push("この名前は使用できません");
            }

            // エラーを動的に追加
            errors.forEach((errorText) => {
              const errorElement = document.createElement("sp-error-text");
              errorElement.setAttribute("slot", "error-text");
              errorElement.textContent = errorText;
              field.appendChild(errorElement);
            });
          }}
        >
        </sp-text-field>
        <p style="font-size: 12px; color: #666; margin-top: 8px;">
          入力するとリアルタイムでバリデーションが実行されます
        </p>
      </div>
      <div>
        <sp-label for="toggle-field">エラー切り替え</sp-label>
        <sp-text-field id="toggle-field" placeholder="ボタンでエラーを切り替え">
        </sp-text-field>
        <div style="margin-top: 8px; display: flex; gap: 8px;">
          <button
            @click=${(e: Event) => {
              const field = document.getElementById("toggle-field");
              const existingErrors = field?.querySelectorAll(
                'sp-error-text[slot="error-text"]',
              );
              existingErrors?.forEach((error: HTMLElement) => error.remove());

              const errorElement = document.createElement("sp-error-text");
              errorElement.setAttribute("slot", "error-text");
              errorElement.textContent = "この項目は必須です";
              field?.appendChild(errorElement);
            }}
          >
            エラー表示
          </button>
          <button
            @click=${(e: Event) => {
              const field = document.getElementById("toggle-field");
              const existingErrors = field?.querySelectorAll(
                'sp-error-text[slot="error-text"]',
              );
              existingErrors?.forEach((error: HTMLElement) => error.remove());
            }}
          >
            エラークリア
          </button>
        </div>
      </div>
    </div>
  `,
};

export const AutocompleteExamples: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <sp-label for="name-field">氏名</sp-label>
        <sp-text-field
          id="name-field"
          placeholder="山田太郎"
          autocomplete="name"
          name="fullname"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="given-name-field">名</sp-label>
        <sp-text-field
          id="given-name-field"
          placeholder="太郎"
          autocomplete="given-name"
          name="firstname"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="family-name-field">姓</sp-label>
        <sp-text-field
          id="family-name-field"
          placeholder="山田"
          autocomplete="family-name"
          name="lastname"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="organization-field">会社名</sp-label>
        <sp-text-field
          id="organization-field"
          placeholder="株式会社サンプル"
          autocomplete="organization"
          name="company"
        ></sp-text-field>
      </div>
      <div>
        <sp-label for="street-address-field">住所</sp-label>
        <sp-text-field
          id="street-address-field"
          placeholder="東京都渋谷区..."
          autocomplete="street-address"
          name="address"
        ></sp-text-field>
      </div>
    </div>
  `,
};
