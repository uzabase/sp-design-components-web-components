import { beforeEach, describe, expect, test } from "vitest";

import { SpErrorText } from "../../../src/components/form/error-text/sp-error-text";

function getSpErrorText() {
  return document.querySelector("sp-error-text") as SpErrorText;
}

function getErrorElement() {
  return document
    .querySelector("sp-error-text")!
    .shadowRoot!.querySelector(".base") as HTMLDivElement;
}

function getSlotElement() {
  return document
    .querySelector("sp-error-text")!
    .shadowRoot!.querySelector("slot") as HTMLSlotElement;
}

describe("sp-error-text", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("基本構造", () => {
    test("shadow DOMが正しく構築される", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();
      const slotElement = getSlotElement();

      expect(errorElement).not.toBeNull();
      expect(errorElement.classList.contains("base")).toBe(true);
      expect(slotElement).not.toBeNull();
      expect(errorElement.contains(slotElement)).toBe(true);
    });

    test("要素が正しい階層で配置される", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();
      const slotElement = getSlotElement();

      expect(spErrorText.shadowRoot!.contains(errorElement)).toBe(true);
      expect(errorElement.contains(slotElement)).toBe(true);
    });
  });

  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", () => {
      document.body.innerHTML = "<sp-error-text>必須項目です</sp-error-text>";

      const spErrorText = getSpErrorText();

      expect(spErrorText.textContent).toBe("必須項目です");
    });

    test("スロットに複数の要素を渡すことができる", () => {
      document.body.innerHTML = `
        <sp-error-text>
          <span>エラー1</span>
          <span>エラー2</span>
        </sp-error-text>
      `;

      const spErrorText = getSpErrorText();
      const spans = spErrorText.querySelectorAll("span");

      expect(spans).toHaveLength(2);
      expect(spans[0].textContent).toBe("エラー1");
      expect(spans[1].textContent).toBe("エラー2");
    });

    test("スロットが空の場合でも正常に動作する", () => {
      document.body.innerHTML = "<sp-error-text></sp-error-text>";

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();

      expect(spErrorText.textContent).toBe("");
      expect(errorElement).not.toBeNull();
    });

    test("スロットの内容を動的に変更できる", () => {
      document.body.innerHTML = "<sp-error-text>初期メッセージ</sp-error-text>";

      const spErrorText = getSpErrorText();

      expect(spErrorText.textContent).toBe("初期メッセージ");

      spErrorText.textContent = "更新されたメッセージ";

      expect(spErrorText.textContent).toBe("更新されたメッセージ");
    });

    test("HTMLコンテンツをスロットに渡すことができる", () => {
      document.body.innerHTML = `
        <sp-error-text>
          <strong>重要:</strong> このフィールドは必須です
        </sp-error-text>
      `;

      const spErrorText = getSpErrorText();
      const strongElement = spErrorText.querySelector("strong");

      expect(strongElement).not.toBeNull();
      expect(strongElement!.textContent).toBe("重要:");
      expect(spErrorText.textContent).toContain("このフィールドは必須です");
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

    test("空文字のid属性を設定すると、内部要素のIDも削除される", () => {
      document.body.innerHTML =
        "<sp-error-text id='test-error'>エラーメッセージ</sp-error-text>";

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();

      spErrorText.setAttribute("id", "");

      expect(errorElement.hasAttribute("id")).toBe(false);
    });

    test("同じid値を再設定しても不要な更新は行われない", () => {
      document.body.innerHTML =
        "<sp-error-text id='same-id'>エラーメッセージ</sp-error-text>";

      const spErrorText = getSpErrorText();
      const errorElement = getErrorElement();
      const initialId = errorElement.getAttribute("id");

      // 同じ値を設定
      spErrorText.setAttribute("id", "same-id");

      expect(errorElement.getAttribute("id")).toBe(initialId);
    });

    test("特殊文字を含むIDも正しく処理される", () => {
      document.body.innerHTML =
        "<sp-error-text id='error-123_test-field'>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();

      expect(errorElement.getAttribute("id")).toBe("error-123_test-field");
    });
  });

  describe("アクセシビリティ", () => {
    test("role='alert'が設定されている", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();

      expect(errorElement.getAttribute("role")).toBe("alert");
    });

    test("role属性は変更されない", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";

      const errorElement = getErrorElement();

      // 初期状態でrole="alert"が設定されている
      expect(errorElement.getAttribute("role")).toBe("alert");

      // 他の属性を変更してもroleは維持される
      const spErrorText = getSpErrorText();
      spErrorText.setAttribute("id", "test-id");

      expect(errorElement.getAttribute("role")).toBe("alert");
    });

    test("スクリーンリーダーがエラーメッセージを認識できる", () => {
      document.body.innerHTML =
        "<sp-error-text id='field-error'>このフィールドは必須です</sp-error-text>";

      const errorElement = getErrorElement();

      // role="alert"とidが設定されているため、aria-describedbyで参照可能
      expect(errorElement.getAttribute("role")).toBe("alert");
      expect(errorElement.getAttribute("id")).toBe("field-error");
    });
  });

  describe("observedAttributes", () => {
    test("observedAttributesに'id'が含まれている", () => {
      const observedAttributes = SpErrorText.observedAttributes;

      expect(observedAttributes).toContain("id");
      expect(observedAttributes).toHaveLength(1);
    });
  });

  describe("カスタム要素の登録", () => {
    test("sp-error-textがカスタム要素として登録されている", () => {
      expect(customElements.get("sp-error-text")).toBeDefined();
    });

    test("HTMLElementTagNameMapに型定義が含まれている", () => {
      document.body.innerHTML = "<sp-error-text>テスト</sp-error-text>";

      // TypeScriptの型チェックで確認されるため、コンパイルエラーがなければOK
      const element: HTMLElementTagNameMap["sp-error-text"] = getSpErrorText();
      expect(element).toBeInstanceOf(SpErrorText);
    });
  });

  describe("ライフサイクル", () => {
    test("connectedCallbackで要素が正しく初期化される", () => {
      // DOM外で要素を作成
      const spErrorText = document.createElement("sp-error-text");
      spErrorText.textContent = "テストメッセージ";

      // DOMに追加する前は内部構造が不完全
      expect(spErrorText.shadowRoot).not.toBeNull();

      // DOMに追加
      document.body.appendChild(spErrorText);

      // 追加後は内部構造が完成
      const errorElement = spErrorText.shadowRoot!.querySelector(".base");
      expect(errorElement).not.toBeNull();
      expect(errorElement!.getAttribute("role")).toBe("alert");
    });

    test("複数のインスタンスが独立して動作する", () => {
      document.body.innerHTML = `
        <sp-error-text id="error1">エラー1</sp-error-text>
        <sp-error-text id="error2">エラー2</sp-error-text>
      `;

      const error1 = document.querySelector(
        "sp-error-text[id='error1']",
      ) as SpErrorText;
      const error2 = document.querySelector(
        "sp-error-text[id='error2']",
      ) as SpErrorText;

      const errorElement1 = error1.shadowRoot!.querySelector(
        ".base",
      ) as HTMLDivElement;
      const errorElement2 = error2.shadowRoot!.querySelector(
        ".base",
      ) as HTMLDivElement;

      expect(errorElement1.getAttribute("id")).toBe("error1");
      expect(errorElement2.getAttribute("id")).toBe("error2");
      expect(error1.textContent).toBe("エラー1");
      expect(error2.textContent).toBe("エラー2");
    });
  });

  describe("エラーハンドリング", () => {
    test("不正な属性値でもエラーが発生しない", () => {
      expect(() => {
        document.body.innerHTML =
          "<sp-error-text id=''>エラーメッセージ</sp-error-text>";
      }).not.toThrow();

      const errorElement = getErrorElement();
      expect(errorElement).not.toBeNull();
    });

    test("nullやundefinedのid値でもエラーが発生しない", () => {
      document.body.innerHTML =
        "<sp-error-text>エラーメッセージ</sp-error-text>";
      const spErrorText = getSpErrorText();

      expect(() => {
        spErrorText.setAttribute("id", "test");
        spErrorText.removeAttribute("id");
      }).not.toThrow();
    });
  });
});
