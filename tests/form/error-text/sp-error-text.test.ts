import "../../../src/components/form/error-text/sp-error-text";

import { describe, expect, test } from "vitest";

import type { SpErrorText } from "../../../src/components/form/error-text/sp-error-text";

function getSpErrorText() {
  return document.querySelector("sp-error-text") as SpErrorText;
}

function getErrorElement() {
  return document
    .querySelector("sp-error-text")!
    .shadowRoot!.querySelector(".base") as HTMLDivElement;
}

describe("sp-error-text", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", () => {
      document.body.innerHTML = "<sp-error-text>必須項目です</sp-error-text>";

      const spErrorText = getSpErrorText();

      expect(spErrorText.textContent).toBe("必須項目です");
    });
  });
  describe("id属性", () => {
    test("id属性を設定すると、内部要素にもIDが設定される", () => {
      document.body.innerHTML =
        "<sp-error-text id='error-123'>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();

      expect(errorElement.getAttribute("id")).toBe("error-123");
    });

    test("id属性を設定しない場合、内部要素にIDは設定されない", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();

      expect(errorElement.hasAttribute("id")).toBe(false);
    });

    test("id属性を更新すると、内部要素のIDも更新される", () => {
      document.body.innerHTML =
        "<sp-error-text id='initial-error'>エラーメッセージ</sp-error-text>";

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();

      spErrorText.setAttribute("id", "updated-error");

      expect(errorElement.getAttribute("id")).toBe("updated-error");
    });

    test("id属性を削除すると、内部要素のIDも削除される", () => {
      document.body.innerHTML =
        "<sp-error-text id='test-error'>エラーメッセージ</sp-error-text>";

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();

      spErrorText.removeAttribute("id");

      expect(errorElement.hasAttribute("id")).toBe(false);
    });
  });

  describe("アクセシビリティ", () => {
    test("role='alert'が設定されている", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();

      expect(errorElement.getAttribute("role")).toBe("alert");
    });
  });
});
