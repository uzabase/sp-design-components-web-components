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
    readonly: { type: "boolean" },
    type: { type: "string" },
    maxlength: { type: "number" },
    name: { type: "string" },
    required: { type: "boolean" },
    autofocus: { type: "boolean" },
  },
  render: (args) => html`
    <sp-text-field
      .value=${args.value ?? ""}
      placeholder=${args.placeholder ?? ""}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      type=${args.type ?? "text"}
      maxlength=${args.maxlength ?? 100}
      name=${args.name ?? ""}
      ?required=${args.required}
      ?autofocus=${args.autofocus}
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
    readonly: false,
    type: "text",
    maxlength: 100,
    name: "",
    required: false,
    autofocus: false,
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
