import "../../../src/components/form/text-field/sp-text-field";

import { describe, expect, test, vi } from "vitest";

import type { SpTextField } from "../../../src/components/form/text-field/sp-text-field";

function getSpTextField() {
  return document.querySelector("sp-text-field") as SpTextField;
}

function getInputElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".text-field") as HTMLInputElement;
}

function getCharacterCounter() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("sp-character-counter") as HTMLElement;
}

function getErrorText() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("sp-error-text") as HTMLElement;
}

describe("sp-text-field", () => {
  describe("value属性", () => {
    test("value属性を設定すると、入力値として表示される", () => {
      document.body.innerHTML =
        "<sp-text-field value='テスト値'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.value).toBe("テスト値");
    });

    test("value属性を設定しない場合、空文字が表示される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.value).toBe("");
    });

    test("value属性を更新すると、入力値が更新される", () => {
      document.body.innerHTML =
        "<sp-text-field value='初期値'></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.setAttribute("value", "更新値");

      expect(inputElement.value).toBe("更新値");
    });
  });

  describe("placeholder属性", () => {
    test("placeholder属性を設定すると、プレースホルダーが表示される", () => {
      document.body.innerHTML =
        "<sp-text-field placeholder='入力してください'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.placeholder).toBe("入力してください");
    });

    test("placeholder属性を設定しない場合、プレースホルダーは空", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.placeholder).toBe("");
    });

    test("placeholder属性を更新すると、プレースホルダーが更新される", () => {
      document.body.innerHTML =
        "<sp-text-field placeholder='初期プレースホルダー'></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.setAttribute("placeholder", "更新プレースホルダー");

      expect(inputElement.placeholder).toBe("更新プレースホルダー");
    });
  });

  describe("type属性", () => {
    test("type属性を設定すると、input要素のタイプが変更される", () => {
      document.body.innerHTML =
        "<sp-text-field type='password'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.type).toBe("password");
    });

    test("type属性を設定しない場合、デフォルトは'text'", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.type).toBe("text");
    });
  });

  describe("disabled属性", () => {
    test("disabled属性を設定すると、入力要素が無効化される", () => {
      document.body.innerHTML = "<sp-text-field disabled></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.disabled).toBe(true);
    });

    test("disabled属性を設定しない場合、入力要素は有効", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.disabled).toBe(false);
    });

    test("disabled='false'を設定すると、入力要素は有効", () => {
      document.body.innerHTML =
        "<sp-text-field disabled='false'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.disabled).toBe(false);
    });
  });

  describe("required属性", () => {
    test("required属性を設定すると、入力要素が必須になる", () => {
      document.body.innerHTML = "<sp-text-field required></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.required).toBe(true);
    });

    test("required属性を設定しない場合、入力要素は任意", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.required).toBe(false);
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、入力要素のnameが設定される", () => {
      document.body.innerHTML =
        "<sp-text-field name='username'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.name).toBe("username");
    });

    test("name属性を設定しない場合、入力要素のnameは空", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.name).toBe("");
    });
  });

  describe("autocomplete属性", () => {
    test("autocomplete属性を設定すると、入力要素のautocompleteが設定される", () => {
      document.body.innerHTML =
        "<sp-text-field autocomplete='email'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.getAttribute("autocomplete")).toBe("email");
    });
  });

  describe("character-limit属性", () => {
    test("character-limit属性を設定すると、文字数カウンターが表示される", () => {
      document.body.innerHTML =
        "<sp-text-field character-limit='10'></sp-text-field>";

      const characterCounter = getCharacterCounter();

      expect(characterCounter).not.toBeNull();
      expect(characterCounter.style.display).not.toBe("none");
      expect(characterCounter.getAttribute("max")).toBe("10");
      expect(characterCounter.getAttribute("current")).toBe("0");
    });

    test("character-limit属性を設定しない場合、文字数カウンターは非表示", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const characterCounter = getCharacterCounter();

      expect(characterCounter.style.display).toBe("none");
    });

    test("値を入力すると文字数カウンターが更新される", () => {
      document.body.innerHTML =
        "<sp-text-field character-limit='10' value='hello'></sp-text-field>";

      const characterCounter = getCharacterCounter();

      expect(characterCounter.getAttribute("current")).toBe("5");
      expect(characterCounter.getAttribute("max")).toBe("10");
    });
  });

  describe("invalid属性", () => {
    test("invalid属性を設定すると、エラーテキストが表示される", () => {
      document.body.innerHTML = `
        <sp-text-field invalid>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const errorText = getErrorText();
      const inputElement = getInputElement();

      expect(errorText.style.display).toBe("block");
      expect(inputElement.getAttribute("aria-invalid")).toBe("true");
    });

    test("invalid属性を設定しない場合、エラーテキストは非表示", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const errorText = getErrorText();
      const inputElement = getInputElement();

      expect(errorText.style.display).toBe("none");
      expect(inputElement.hasAttribute("aria-invalid")).toBe(false);
    });

    test("invalid属性を更新すると、エラーテキストの表示が更新される", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const spTextField = getSpTextField();
      const errorText = getErrorText();

      spTextField.setAttribute("invalid", "");
      expect(errorText.style.display).toBe("block");
    });
  });

  describe("inputイベント", () => {
    test("入力値が変更されると、inputイベントが発生する", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();
      const mockHandler = vi.fn();

      spTextField.addEventListener("input", mockHandler);

      inputElement.dispatchEvent(new Event("input"));

      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });
});
