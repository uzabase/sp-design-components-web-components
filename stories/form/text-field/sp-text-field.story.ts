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
  },
  render: (args) => html`
    <sp-text-field
      .value=${args.value ?? ""}
      placeholder=${args.placeholder ?? ""}
      ?disabled=${args.disabled}
      name=${args.name ?? ""}
      ?required=${args.required}
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
    <sp-text-field invalid>
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
          invalid
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
          invalid
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
          invalid
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
