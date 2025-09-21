import { beforeEach, describe, expect, test, vi } from "vitest";

import { SpTextField } from "../../../src/components/form/text-field/sp-text-field";

function getSpTextField() {
  return document.querySelector("sp-text-field") as SpTextField;
}

function getWrapperElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".wrapper") as HTMLDivElement;
}

function getLabelElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("sp-label") as HTMLElement;
}

function queryLabelElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("sp-label");
}

function getContainerElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".container") as HTMLDivElement;
}

function getInputElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".text-field") as HTMLInputElement;
}

function getInfoElement() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".info") as HTMLDivElement;
}

function getErrorContainer() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector(".error-container") as HTMLDivElement;
}

function getCharacterCounter() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("sp-character-counter") as HTMLElement;
}

function queryCharacterCounter() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("sp-character-counter");
}

function getErrorSlot() {
  return document
    .querySelector("sp-text-field")!
    .shadowRoot!.querySelector("slot[name='error-text']") as HTMLSlotElement;
}

describe("sp-text-field", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("基本構造", () => {
    test("shadow DOMが正しく構築される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const wrapperElement = getWrapperElement();
      const containerElement = getContainerElement();
      const inputElement = getInputElement();
      const infoElement = getInfoElement();
      const errorContainer = getErrorContainer();

      expect(wrapperElement).not.toBeNull();
      expect(wrapperElement.classList.contains("wrapper")).toBe(true);
      expect(containerElement).not.toBeNull();
      expect(containerElement.classList.contains("container")).toBe(true);
      expect(inputElement).not.toBeNull();
      expect(inputElement.classList.contains("text-field")).toBe(true);
      expect(inputElement.tagName).toBe("INPUT");
      expect(infoElement).not.toBeNull();
      expect(infoElement.classList.contains("info")).toBe(true);
      expect(errorContainer).not.toBeNull();
      expect(errorContainer.classList.contains("error-container")).toBe(true);
    });

    test("要素が正しい階層で配置される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const wrapperElement = getWrapperElement();
      const containerElement = getContainerElement();
      const inputElement = getInputElement();
      const infoElement = getInfoElement();

      expect(spTextField.shadowRoot!.contains(wrapperElement)).toBe(true);
      expect(wrapperElement.contains(containerElement)).toBe(true);
      expect(containerElement.contains(inputElement)).toBe(true);
      expect(wrapperElement.contains(infoElement)).toBe(true); // infoElementはwrapperの直下
    });
  });

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

    test("プロパティ経由でvalueを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.value = "プロパティ値";

      expect(inputElement.value).toBe("プロパティ値");
      // プロパティ設定では属性は自動的に設定されない
      expect(spTextField.value).toBe("プロパティ値");
    });

    test("プロパティ経由でvalueを取得できる", () => {
      document.body.innerHTML =
        "<sp-text-field value='取得テスト'></sp-text-field>";

      const spTextField = getSpTextField();

      expect(spTextField.value).toBe("取得テスト");
    });

    test("ユーザーが入力した値がプロパティに反映される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      // ユーザー入力をシミュレート
      inputElement.value = "ユーザー入力";
      inputElement.dispatchEvent(new Event("input"));

      expect(spTextField.value).toBe("ユーザー入力");
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

    test("プロパティ経由でplaceholderを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.placeholder = "プロパティプレースホルダー";

      expect(inputElement.placeholder).toBe("プロパティプレースホルダー");
      expect(spTextField.getAttribute("placeholder")).toBe(
        "プロパティプレースホルダー",
      );
    });

    test("プロパティ経由でplaceholderを取得できる", () => {
      document.body.innerHTML =
        "<sp-text-field placeholder='取得テスト'></sp-text-field>";

      const spTextField = getSpTextField();

      expect(spTextField.placeholder).toBe("取得テスト");
    });
  });

  describe("type属性", () => {
    test("type属性を設定すると、input要素のタイプが変更される", () => {
      document.body.innerHTML =
        "<sp-text-field type='password'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.type).toBe("password");
    });

    test("type属性を設定しない場合、デフォルトでtextタイプになる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.type).toBe("text");
    });

    test("type属性を更新すると、input要素のタイプが更新される", () => {
      document.body.innerHTML = "<sp-text-field type='text'></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.setAttribute("type", "email");

      expect(inputElement.type).toBe("email");
    });

    test("プロパティ経由でtypeを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.type = "number";

      expect(inputElement.type).toBe("number");
      expect(spTextField.getAttribute("type")).toBe("number");
    });

    test("様々なinputタイプが正しく設定される", () => {
      const types = [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
      ];

      types.forEach((type) => {
        document.body.innerHTML = `<sp-text-field type='${type}'></sp-text-field>`;
        const inputElement = getInputElement();
        expect(inputElement.type).toBe(type);
      });
    });
  });

  describe("disabled属性", () => {
    test("disabled属性を設定すると、入力フィールドが無効になる", () => {
      document.body.innerHTML = "<sp-text-field disabled></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.disabled).toBe(true);
    });

    test("disabled属性を設定しない場合、入力フィールドが有効になる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.disabled).toBe(false);
    });

    test("disabled属性を更新すると、入力フィールドの状態が更新される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.setAttribute("disabled", "");

      expect(inputElement.disabled).toBe(true);

      spTextField.removeAttribute("disabled");

      expect(inputElement.disabled).toBe(false);
    });

    test("プロパティ経由でdisabledを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.disabled = true;

      expect(inputElement.disabled).toBe(true);
      expect(spTextField.hasAttribute("disabled")).toBe(true);

      spTextField.disabled = false;

      expect(inputElement.disabled).toBe(false);
      expect(spTextField.hasAttribute("disabled")).toBe(false);
    });
  });

  describe("required属性", () => {
    test("required属性を設定すると、入力フィールドが必須になる", () => {
      document.body.innerHTML = "<sp-text-field required></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.required).toBe(true);
    });

    test("required属性を設定しない場合、入力フィールドが任意になる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.required).toBe(false);
    });

    test("プロパティ経由でrequiredを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.required = true;

      expect(inputElement.required).toBe(true);
      expect(spTextField.hasAttribute("required")).toBe(true);
    });

    test("required属性がラベルにも反映される", () => {
      document.body.innerHTML =
        "<sp-text-field label='ユーザー名' required></sp-text-field>";

      const labelElement = getLabelElement();

      expect(labelElement.hasAttribute("required")).toBe(true);
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、input要素のnameが設定される", () => {
      document.body.innerHTML =
        "<sp-text-field name='username'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.name).toBe("username");
    });

    test("プロパティ経由でnameを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.name = "email";

      expect(inputElement.name).toBe("email");
      expect(spTextField.getAttribute("name")).toBe("email");
    });
  });

  describe("autocomplete属性", () => {
    test("autocomplete属性を設定すると、input要素のautocompleteが設定される", () => {
      document.body.innerHTML =
        "<sp-text-field autocomplete='username'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.getAttribute("autocomplete")).toBe("username");
    });

    test("プロパティ経由でautocompleteを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();

      spTextField.autocomplete = "email";

      expect(inputElement.getAttribute("autocomplete")).toBe("email");
      expect(spTextField.getAttribute("autocomplete")).toBe("email");
    });

    test("無効なautocomplete値でも属性として設定される", () => {
      document.body.innerHTML =
        "<sp-text-field autocomplete='invalid-value'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.getAttribute("autocomplete")).toBe("invalid-value");
    });
  });

  describe("label属性", () => {
    test("label属性を設定すると、ラベルが表示される", () => {
      document.body.innerHTML =
        "<sp-text-field label='ユーザー名'></sp-text-field>";

      const labelElement = getLabelElement();

      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent).toBe("ユーザー名");
    });

    test("label属性を設定しない場合、ラベルは表示されない", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const labelElement = queryLabelElement();

      expect(labelElement).toBeNull();
    });

    test("label属性を更新すると、ラベルの内容が更新される", () => {
      document.body.innerHTML =
        "<sp-text-field label='初期ラベル'></sp-text-field>";

      const spTextField = getSpTextField();
      const labelElement = getLabelElement();

      spTextField.setAttribute("label", "更新ラベル");

      expect(labelElement.textContent).toBe("更新ラベル");
    });

    test("label属性を削除すると、ラベルが削除される", () => {
      document.body.innerHTML =
        "<sp-text-field label='削除予定'></sp-text-field>";

      const spTextField = getSpTextField();

      spTextField.removeAttribute("label");

      const labelElement = queryLabelElement();
      expect(labelElement).toBeNull();
    });

    test("プロパティ経由でlabelを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();

      spTextField.label = "プロパティラベル";

      const labelElement = getLabelElement();
      expect(labelElement.textContent).toBe("プロパティラベル");
      expect(spTextField.getAttribute("label")).toBe("プロパティラベル");
    });

    test("ラベルクリックで入力フィールドにフォーカスが移る", () => {
      document.body.innerHTML =
        "<sp-text-field label='クリックテスト'></sp-text-field>";

      const labelElement = getLabelElement();
      const inputElement = getInputElement();

      // フォーカスのスパイを設定
      const focusSpy = vi.spyOn(inputElement, "focus");

      labelElement.click();

      expect(focusSpy).toHaveBeenCalled();
    });

    test("disabled状態でラベルクリックしてもフォーカスが移らない", () => {
      document.body.innerHTML =
        "<sp-text-field label='無効テスト' disabled></sp-text-field>";

      const labelElement = getLabelElement();
      const inputElement = getInputElement();

      const focusSpy = vi.spyOn(inputElement, "focus");

      labelElement.click();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe("orientation属性", () => {
    test("orientation='horizontal'を設定すると、水平レイアウトになる", () => {
      document.body.innerHTML =
        "<sp-text-field label='テスト' orientation='horizontal'></sp-text-field>";

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
    });

    test("orientation='vertical'を設定すると、垂直レイアウトになる", () => {
      document.body.innerHTML =
        "<sp-text-field label='テスト' orientation='vertical'></sp-text-field>";

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe("vertical");
    });

    test("orientation属性を設定しない場合、デフォルトで垂直レイアウトになる", () => {
      document.body.innerHTML =
        "<sp-text-field label='テスト'></sp-text-field>";

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe("vertical");
    });

    test("無効なorientation値の場合、垂直レイアウトになる", () => {
      document.body.innerHTML =
        "<sp-text-field label='テスト' orientation='invalid'></sp-text-field>";

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe("vertical");
    });

    test("プロパティ経由でorientationを設定できる", () => {
      document.body.innerHTML =
        "<sp-text-field label='テスト'></sp-text-field>";

      const spTextField = getSpTextField();
      const wrapperElement = getWrapperElement();

      spTextField.orientation = "horizontal";

      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
      expect(spTextField.getAttribute("orientation")).toBe("horizontal");
    });
  });

  describe("character-limit属性", () => {
    test("character-limit属性を設定すると、文字数カウンターが表示される", () => {
      document.body.innerHTML =
        "<sp-text-field character-limit='100'></sp-text-field>";

      const characterCounter = getCharacterCounter();

      expect(characterCounter).not.toBeNull();
      expect(characterCounter.getAttribute("max")).toBe("100");
    });

    test("character-limit属性を設定しない場合、文字数カウンターは非表示になる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const characterCounter = queryCharacterCounter();

      expect(characterCounter).not.toBeNull();
      expect(characterCounter!.style.display).toBe("none");
    });

    test("プロパティ経由でcharacterLimitを設定できる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();

      spTextField.characterLimit = 50;

      const characterCounter = getCharacterCounter();
      expect(characterCounter.getAttribute("max")).toBe("50");
      expect(spTextField.getAttribute("character-limit")).toBe("50");
    });

    test("文字数が変更されると、カウンターが更新される", () => {
      document.body.innerHTML =
        "<sp-text-field character-limit='10'></sp-text-field>";

      const spTextField = getSpTextField();
      const characterCounter = getCharacterCounter();

      spTextField.value = "test";

      expect(characterCounter.getAttribute("current")).toBe("4");
    });

    test("character-limitを削除すると、カウンターが非表示になる", () => {
      document.body.innerHTML =
        "<sp-text-field character-limit='10'></sp-text-field>";

      const spTextField = getSpTextField();

      spTextField.characterLimit = undefined;

      const characterCounter = queryCharacterCounter();
      expect(characterCounter).not.toBeNull();
      expect(characterCounter!.style.display).toBe("none");
    });
  });

  describe("エラー表示", () => {
    test("エラースロットが正しく配置される", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const errorSlot = getErrorSlot();
      const errorContainer = getErrorContainer();

      expect(errorSlot).not.toBeNull();
      expect(errorContainer.contains(errorSlot)).toBe(true);
    });

    test("エラーが存在する場合、エラーコンテナが表示される", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const errorContainer = getErrorContainer();

      // エラーが存在する場合、display: flexになる
      expect(errorContainer.style.display).toBe("flex");
    });

    test("エラーが存在しない場合、エラーコンテナが非表示になる", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const errorContainer = getErrorContainer();

      expect(errorContainer.style.display).toBe("none");
    });

    test("複数のエラーメッセージを表示できる", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text">エラー1</sp-error-text>
          <sp-error-text slot="error-text">エラー2</sp-error-text>
        </sp-text-field>
      `;

      const spTextField = getSpTextField();
      const errorTexts = spTextField.querySelectorAll(
        'sp-error-text[slot="error-text"]',
      );

      expect(errorTexts).toHaveLength(2);
    });
  });

  describe("フォーム統合", () => {
    test("form要素と正しく統合される", () => {
      document.body.innerHTML = `
        <form>
          <sp-text-field name="username" value="testuser"></sp-text-field>
        </form>
      `;

      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement,
      );

      expect(formData.get("username")).toBe("testuser");
    });

    test("disabled状態ではフォームデータに含まれない", () => {
      document.body.innerHTML = `
        <form>
          <sp-text-field name="username" value="testuser" disabled></sp-text-field>
        </form>
      `;

      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement,
      );

      expect(formData.get("username")).toBeNull();
    });

    test("required属性でバリデーションが機能する", () => {
      document.body.innerHTML = `
        <form>
          <sp-text-field name="username" required></sp-text-field>
        </form>
      `;

      const inputElement = getInputElement();

      expect(inputElement.checkValidity()).toBe(false);

      inputElement.value = "test";
      expect(inputElement.checkValidity()).toBe(true);
    });
  });

  describe("イベント", () => {
    test("inputイベントが正しく転送される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();
      let eventFired = false;

      spTextField.addEventListener("input", () => {
        eventFired = true;
      });

      inputElement.dispatchEvent(new Event("input"));

      expect(eventFired).toBe(true);
    });

    test("changeイベントは転送されない（inputイベントのみ転送）", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();
      let eventFired = false;

      spTextField.addEventListener("change", () => {
        eventFired = true;
      });

      inputElement.dispatchEvent(new Event("change"));

      expect(eventFired).toBe(false);
    });

    test("focusイベントは転送されない（inputイベントのみ転送）", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();
      let eventFired = false;

      spTextField.addEventListener("focus", () => {
        eventFired = true;
      });

      inputElement.dispatchEvent(new Event("focus"));

      expect(eventFired).toBe(false);
    });

    test("blurイベントは転送されない（inputイベントのみ転送）", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();
      let eventFired = false;

      spTextField.addEventListener("blur", () => {
        eventFired = true;
      });

      inputElement.dispatchEvent(new Event("blur"));

      expect(eventFired).toBe(false);
    });
  });

  describe("アクセシビリティ", () => {
    test("ラベルがaria-labelとして設定される", () => {
      document.body.innerHTML =
        "<sp-text-field label='ユーザー名'></sp-text-field>";

      const inputElement = getInputElement();

      expect(inputElement.getAttribute("aria-label")).toBe("ユーザー名");
    });

    test("エラーメッセージとaria-describedbyで関連付けられる", () => {
      document.body.innerHTML = `
        <sp-text-field>
          <sp-error-text slot="error-text" id="error-1">エラーメッセージ</sp-error-text>
        </sp-text-field>
      `;

      const inputElement = getInputElement();
      const errorContainer = getErrorContainer();

      // エラーコンテナのIDがaria-describedbyに設定される
      expect(inputElement.getAttribute("aria-describedby")).toBe(
        errorContainer.id,
      );
    });

    test("aria-invalidは自動設定されない（手動で管理する必要がある）", () => {
      document.body.innerHTML = "<sp-text-field required></sp-text-field>";

      const inputElement = getInputElement();

      // aria-invalidは自動では設定されない
      expect(inputElement.getAttribute("aria-invalid")).toBeNull();
    });
  });

  describe("observedAttributes", () => {
    test("observedAttributesに必要な属性が全て含まれている", () => {
      const observedAttributes = SpTextField.observedAttributes;
      const expectedAttributes = [
        "value",
        "placeholder",
        "disabled",
        "character-limit",
        "name",
        "required",
        "type",
        "autocomplete",
        "label",
        "orientation",
      ];

      expectedAttributes.forEach((attr) => {
        expect(observedAttributes).toContain(attr);
      });
    });
  });

  describe("エラーハンドリング", () => {
    test("不正な属性値でもエラーが発生しない", () => {
      expect(() => {
        document.body.innerHTML = `
          <sp-text-field 
            type="invalid-type" 
            character-limit="not-a-number"
            orientation="invalid-orientation">
          </sp-text-field>
        `;
      }).not.toThrow();
    });

    test("同じ値を再設定しても不要な更新は行われない", () => {
      document.body.innerHTML = "<sp-text-field value='test'></sp-text-field>";

      const spTextField = getSpTextField();
      const inputElement = getInputElement();
      const initialValue = inputElement.value;

      // 同じ値を設定
      spTextField.setAttribute("value", "test");

      expect(inputElement.value).toBe(initialValue);
    });
  });

  describe("複雑なシナリオ", () => {
    test("全ての機能を組み合わせて使用できる", () => {
      document.body.innerHTML = `
        <sp-text-field 
          label="ユーザー名"
          placeholder="名前を入力してください"
          type="text"
          name="username"
          required
          character-limit="20"
          orientation="horizontal"
          autocomplete="username">
          <sp-error-text slot="error-text" id="username-error">ユーザー名は必須です</sp-error-text>
        </sp-text-field>
      `;

      const inputElement = getInputElement();
      const labelElement = getLabelElement();
      const characterCounter = getCharacterCounter();
      const wrapperElement = getWrapperElement();

      expect(labelElement.textContent).toBe("ユーザー名");
      expect(labelElement.hasAttribute("required")).toBe(true);
      expect(inputElement.placeholder).toBe("名前を入力してください");
      expect(inputElement.type).toBe("text");
      expect(inputElement.name).toBe("username");
      expect(inputElement.required).toBe(true);
      expect(inputElement.getAttribute("autocomplete")).toBe("username");
      expect(characterCounter.getAttribute("max")).toBe("20");
      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
    });

    test("動的な値の変更が全て正しく反映される", () => {
      document.body.innerHTML = "<sp-text-field></sp-text-field>";

      // 複数の属性を順次変更
      const spTextField = getSpTextField();
      spTextField.label = "動的ラベル";
      spTextField.value = "動的値";
      spTextField.placeholder = "動的プレースホルダー";
      spTextField.required = true;
      spTextField.characterLimit = 15;
      spTextField.orientation = "horizontal";

      const inputElement = getInputElement();
      const labelElement = getLabelElement();
      const characterCounter = getCharacterCounter();
      const wrapperElement = getWrapperElement();

      expect(labelElement.textContent).toBe("動的ラベル");
      expect(inputElement.value).toBe("動的値");
      expect(inputElement.placeholder).toBe("動的プレースホルダー");
      expect(inputElement.required).toBe(true);
      expect(characterCounter.getAttribute("max")).toBe("15");
      expect(characterCounter.getAttribute("current")).toBe("3"); // "動的値"の文字数
      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
    });
  });
});
