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

function getErrorContainer() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".error-container") as HTMLElement;
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

    test("placeholder属性を設定しない場合、プレースホルダーが空になる", () => {
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

    test("type属性を設定しない場合、デフォルトで'text'になる", () => {
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

    test("disabled属性を設定しない場合、入力要素が有効になる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.disabled).toBe(false);
    });

    test("disabled='false'を設定すると、入力要素が有効になる", () => {
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

    test("required属性を設定しない場合、入力要素が任意になる", () => {
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

    test("name属性を設定しない場合、入力要素のnameが空になる", () => {
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

    test("character-limit属性を設定しない場合、文字数カウンターが非表示になる", () => {
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

  describe("エラースロット", () => {
    test("エラースロットにコンテンツがある場合、エラーテキストが表示される", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const errorContainer = getErrorContainer();

      expect(errorContainer.style.display).toBe("flex");
    });

    test("エラースロットにコンテンツがない場合、エラーテキストが非表示になる", () => {
      document.body.innerHTML = `<sp-text-field></sp-text-field>`;

      const errorContainer = getErrorContainer();

      expect(errorContainer.style.display).toBe("none");
    });

    test("エラースロットにコンテンツを動的に追加すると、エラーテキストが表示される", async () => {
      document.body.innerHTML = `<sp-text-field></sp-text-field>`;

      const spTextField = getSpTextField();
      const errorContainer = getErrorContainer();

      const errorElement = document.createElement("sp-error-text");
      errorElement.setAttribute("slot", "error-text");
      errorElement.textContent = "動的エラーメッセージ";
      spTextField.appendChild(errorElement);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(errorContainer.style.display).toBe("flex");
    });

    test("エラースロットのコンテンツを動的に削除すると、エラーテキストが非表示になる", async () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const spTextField = getSpTextField();
      const errorContainer = getErrorContainer();
      const errorSlotElement = spTextField.querySelector('[slot="error-text"]');

      errorSlotElement?.remove();

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(errorContainer.style.display).toBe("none");
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
