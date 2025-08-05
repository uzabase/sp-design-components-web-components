import "../../../src/components/form/error-text/sp-error-text";

import { describe, expect, test } from "vitest";

import type { SpErrorText } from "../../../src/components/form/error-text/sp-error-text";

function getSpErrorText() {
  return document.querySelector("sp-error-text") as SpErrorText;
}

function getErrorElement() {
  const spErrorText = getSpErrorText();
  return spErrorText.shadowRoot!.querySelector("div");
}

describe("sp-error-text", () => {
  describe("スロット", () => {
    test("スロットに渡されたエラーメッセージが正しく表示される", () => {
      document.body.innerHTML = "<sp-error-text>必須項目です</sp-error-text>";

      const spErrorText = getSpErrorText();
      expect(spErrorText.textContent).toBe("必須項目です");
    });
  });

  describe("アクセシビリティ", () => {
    test("role='alert'が設定されている", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();
      expect(errorElement!.getAttribute("role")).toBe("alert");
    });

    test("複数のエラーテキストが異なるIDを持つ", () => {
      document.body.innerHTML = `
        <sp-error-text id="error-1">エラー1</sp-error-text>
        <sp-error-text id="error-2">エラー2</sp-error-text>
      `;

      const errorTexts = document.querySelectorAll(
        "sp-error-text",
      ) as NodeListOf<SpErrorText>;
      const id1 = errorTexts[0].errorId;
      const id2 = errorTexts[1].errorId;

      expect(id1).toBe("error-1");
      expect(id2).toBe("error-2");
      expect(id1).not.toBe(id2);
    });
  });

  describe("ID管理", () => {
    test("外部からIDが設定された場合、内部要素のIDも設定される", () => {
      document.body.innerHTML =
        '<sp-error-text id="custom-error">エラーメッセージ</sp-error-text>';

      const errorElement = getErrorElement();
      expect(errorElement!.id).toBe("custom-error");
    });

    test("IDが動的に変更された場合、内部要素のIDも更新される", () => {
      document.body.innerHTML =
        '<sp-error-text id="initial-error">エラーメッセージ</sp-error-text>';

      const errorElement = getErrorElement();
      expect(errorElement!.id).toBe("initial-error");

      const spErrorText = getSpErrorText();
      spErrorText.setAttribute("id", "updated-error");
      expect(errorElement!.id).toBe("updated-error");
    });

    test("IDが削除された場合、内部要素のIDも削除される", () => {
      document.body.innerHTML =
        '<sp-error-text id="test-error">エラーメッセージ</sp-error-text>';

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();
      expect(errorElement!.id).toBe("test-error");

      spErrorText.removeAttribute("id");
      expect(errorElement!.hasAttribute("id")).toBe(false);
    });
  });
});
