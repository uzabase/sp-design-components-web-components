import { beforeEach, describe, expect, test, vi } from "vitest";

import { SpSelect } from "../../../src/components/form/select/sp-select";

function getSpSelect() {
  return document.querySelector("sp-select") as SpSelect;
}

function getWrapperElement() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector(".wrapper") as HTMLDivElement;
}

function getLabelElement() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector("sp-label") as HTMLElement;
}

function queryLabelElement() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector("sp-label");
}

function getContainerElement() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector(".container") as HTMLDivElement;
}

function getSelectElement() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector(".select") as HTMLSelectElement;
}

function getErrorContainer() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector(".error-container") as HTMLDivElement;
}

function getHelpContainer() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector(".help-container") as HTMLDivElement;
}

function getErrorSlot() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector("slot[name='error-text']") as HTMLSlotElement;
}

function getHelpSlot() {
  return document
    .querySelector("sp-select")!
    .shadowRoot!.querySelector("slot[name='help-text']") as HTMLSlotElement;
}

describe("sp-select", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("基本構造", () => {
    test("shadow DOMが正しく構築される", () => {
      document.body.innerHTML = "<sp-select></sp-select>";

      const wrapperElement = getWrapperElement();
      const containerElement = getContainerElement();
      const selectElement = getSelectElement();
      const errorContainer = getErrorContainer();
      const helpContainer = getHelpContainer();

      expect(wrapperElement).not.toBeNull();
      expect(wrapperElement.classList.contains("wrapper")).toBe(true);
      expect(containerElement).not.toBeNull();
      expect(containerElement.classList.contains("container")).toBe(true);
      expect(selectElement).not.toBeNull();
      expect(selectElement.classList.contains("select")).toBe(true);
      expect(selectElement.tagName).toBe("SELECT");
      expect(errorContainer).not.toBeNull();
      expect(errorContainer.classList.contains("error-container")).toBe(true);
      expect(helpContainer).not.toBeNull();
      expect(helpContainer.classList.contains("help-container")).toBe(true);
    });

    test("要素が正しい階層で配置される", () => {
      document.body.innerHTML = "<sp-select></sp-select>";

      const spSelect = getSpSelect();
      const wrapperElement = getWrapperElement();
      const containerElement = getContainerElement();
      const selectElement = getSelectElement();

      expect(spSelect.shadowRoot!.contains(wrapperElement)).toBe(true);
      expect(wrapperElement.contains(containerElement)).toBe(true);
      expect(containerElement.contains(selectElement)).toBe(true);
    });
  });

  describe("value属性", () => {
    test("value属性を設定すると、選択値として表示される", () => {
      document.body.innerHTML = `
        <sp-select value="option2">
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.value).toBe("option2");
    });

    test("value属性を設定しない場合、空文字が表示される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="">選択してください</option>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.value).toBe("");
    });

    test("value属性を更新すると、選択値が更新される", () => {
      document.body.innerHTML = `
        <sp-select value="option1">
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      spSelect.setAttribute("value", "option2");

      expect(selectElement.value).toBe("option2");
    });

    test("プロパティ経由でvalueを設定できる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      spSelect.value = "option2";

      expect(selectElement.value).toBe("option2");
      expect(spSelect.value).toBe("option2");
    });

    test("プロパティ経由でvalueを取得できる", () => {
      document.body.innerHTML = `
        <sp-select value="option1">
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();

      expect(spSelect.value).toBe("option1");
    });

    test("ユーザーが選択した値がプロパティに反映される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      // ユーザー選択をシミュレート
      selectElement.value = "option2";
      selectElement.dispatchEvent(new Event("change"));

      expect(spSelect.value).toBe("option2");
    });
  });

  describe("disabled属性", () => {
    test("disabled属性を設定すると、選択フィールドが無効になる", () => {
      document.body.innerHTML = `
        <sp-select disabled>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.disabled).toBe(true);
    });

    test("disabled属性を設定しない場合、選択フィールドが有効になる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.disabled).toBe(false);
    });

    test("disabled属性を更新すると、選択フィールドの状態が更新される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      spSelect.setAttribute("disabled", "");

      expect(selectElement.disabled).toBe(true);

      spSelect.removeAttribute("disabled");

      expect(selectElement.disabled).toBe(false);
    });

    test("プロパティ経由でdisabledを設定できる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      spSelect.disabled = true;

      expect(selectElement.disabled).toBe(true);
      expect(spSelect.hasAttribute("disabled")).toBe(true);

      spSelect.disabled = false;

      expect(selectElement.disabled).toBe(false);
      expect(spSelect.hasAttribute("disabled")).toBe(false);
    });
  });

  describe("required属性", () => {
    test("required属性を設定すると、選択フィールドが必須になる", () => {
      document.body.innerHTML = `
        <sp-select required>
          <option value="">選択してください</option>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.required).toBe(true);
    });

    test("required属性を設定しない場合、選択フィールドが任意になる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.required).toBe(false);
    });

    test("プロパティ経由でrequiredを設定できる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      spSelect.required = true;

      expect(selectElement.required).toBe(true);
      expect(spSelect.hasAttribute("required")).toBe(true);
    });

    test("required属性がラベルにも反映される", () => {
      document.body.innerHTML = `
        <sp-select label="カテゴリー" required>
          <option value="">選択してください</option>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const labelElement = getLabelElement();

      expect(labelElement.hasAttribute("required")).toBe(true);
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、select要素のnameが設定される", () => {
      document.body.innerHTML = `
        <sp-select name="category">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.name).toBe("category");
    });

    test("プロパティ経由でnameを設定できる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();

      spSelect.name = "region";

      expect(selectElement.name).toBe("region");
      expect(spSelect.getAttribute("name")).toBe("region");
    });
  });

  describe("label属性", () => {
    test("label属性を設定すると、ラベルが表示される", () => {
      document.body.innerHTML = `
        <sp-select label="都道府県">
          <option value="tokyo">東京都</option>
        </sp-select>
      `;

      const labelElement = getLabelElement();

      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent).toBe("都道府県");
    });

    test("label属性を設定しない場合、ラベルは表示されない", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const labelElement = queryLabelElement();

      expect(labelElement).toBeNull();
    });

    test("label属性を更新すると、ラベルの内容が更新される", () => {
      document.body.innerHTML = `
        <sp-select label="初期ラベル">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const labelElement = getLabelElement();

      spSelect.setAttribute("label", "更新ラベル");

      expect(labelElement.textContent).toBe("更新ラベル");
    });

    test("label属性を削除すると、ラベルが削除される", () => {
      document.body.innerHTML = `
        <sp-select label="削除予定">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();

      spSelect.removeAttribute("label");

      const labelElement = queryLabelElement();
      expect(labelElement).toBeNull();
    });

    test("プロパティ経由でlabelを設定できる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();

      spSelect.label = "プロパティラベル";

      const labelElement = getLabelElement();
      expect(labelElement.textContent).toBe("プロパティラベル");
      expect(spSelect.getAttribute("label")).toBe("プロパティラベル");
    });

    test("ラベルクリックで選択フィールドにフォーカスが移る", () => {
      document.body.innerHTML = `
        <sp-select label="クリックテスト">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const labelElement = getLabelElement();
      const selectElement = getSelectElement();

      // フォーカスのスパイを設定
      const focusSpy = vi.spyOn(selectElement, "focus");

      labelElement.click();

      expect(focusSpy).toHaveBeenCalled();
    });

    test("disabled状態でラベルクリックしてもフォーカスが移らない", () => {
      document.body.innerHTML = `
        <sp-select label="無効テスト" disabled>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const labelElement = getLabelElement();
      const selectElement = getSelectElement();

      const focusSpy = vi.spyOn(selectElement, "focus");

      labelElement.click();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe("orientation属性", () => {
    test("orientation='horizontal'を設定すると、水平レイアウトになる", () => {
      document.body.innerHTML = `
        <sp-select label="テスト" orientation="horizontal">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
    });

    test("orientation='vertical'を設定すると、垂直レイアウトになる", () => {
      document.body.innerHTML = `
        <sp-select label="テスト" orientation="vertical">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe("vertical");
    });

    test("orientation属性を設定しない場合、デフォルトで垂直レイアウトになる", () => {
      document.body.innerHTML = `
        <sp-select label="テスト">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe("vertical");
    });

    test("無効なorientation値の場合、垂直レイアウトになる", () => {
      document.body.innerHTML = `
        <sp-select label="テスト" orientation="invalid">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const wrapperElement = getWrapperElement();

      expect(wrapperElement.getAttribute("data-orientation")).toBe("vertical");
    });

    test("プロパティ経由でorientationを設定できる", () => {
      document.body.innerHTML = `
        <sp-select label="テスト">
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const wrapperElement = getWrapperElement();

      spSelect.orientation = "horizontal";

      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
      expect(spSelect.getAttribute("orientation")).toBe("horizontal");
    });
  });

  describe("エラー表示", () => {
    test("エラースロットが正しく配置される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-select>
      `;

      const errorSlot = getErrorSlot();
      const errorContainer = getErrorContainer();

      expect(errorSlot).not.toBeNull();
      expect(errorContainer.contains(errorSlot)).toBe(true);
    });

    test("エラーが存在する場合、エラーコンテナが表示される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-select>
      `;

      const errorContainer = getErrorContainer();

      // エラーが存在する場合、display: flexになる
      expect(errorContainer.style.display).toBe("flex");
    });

    test("エラーが存在しない場合、エラーコンテナが非表示になる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const errorContainer = getErrorContainer();

      expect(errorContainer.style.display).toBe("none");
    });

    test("複数のエラーメッセージを表示できる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <sp-error-text slot="error-text">エラー1</sp-error-text>
          <sp-error-text slot="error-text">エラー2</sp-error-text>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const errorTexts = spSelect.querySelectorAll(
        'sp-error-text[slot="error-text"]',
      );

      expect(errorTexts).toHaveLength(2);
    });
  });

  describe("ヘルプテキスト表示", () => {
    test("ヘルプスロットが正しく配置される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <div slot="help-text">ヘルプメッセージ</div>
        </sp-select>
      `;

      const helpSlot = getHelpSlot();
      const helpContainer = getHelpContainer();

      expect(helpSlot).not.toBeNull();
      expect(helpContainer.contains(helpSlot)).toBe(true);
    });

    test("ヘルプテキストが存在する場合、ヘルプコンテナが表示される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <div slot="help-text">ヘルプメッセージ</div>
        </sp-select>
      `;

      const helpContainer = getHelpContainer();

      expect(helpContainer.style.display).toBe("flex");
    });

    test("ヘルプテキストが存在しない場合、ヘルプコンテナが非表示になる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
        </sp-select>
      `;

      const helpContainer = getHelpContainer();

      expect(helpContainer.style.display).toBe("none");
    });
  });

  describe("フォーム統合", () => {
    test("form要素と正しく統合される", () => {
      document.body.innerHTML = `
        <form>
          <sp-select name="category" value="tech">
            <option value="tech">テクノロジー</option>
            <option value="business">ビジネス</option>
          </sp-select>
        </form>
      `;

      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement,
      );

      expect(formData.get("category")).toBe("tech");
    });

    test("disabled状態ではフォームデータに含まれない", () => {
      document.body.innerHTML = `
        <form>
          <sp-select name="category" value="tech" disabled>
            <option value="tech">テクノロジー</option>
          </sp-select>
        </form>
      `;

      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement,
      );

      expect(formData.get("category")).toBeNull();
    });

    test("required属性でバリデーションが機能する", () => {
      document.body.innerHTML = `
        <form>
          <sp-select name="category" required>
            <option value="">選択してください</option>
            <option value="tech">テクノロジー</option>
          </sp-select>
        </form>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.checkValidity()).toBe(false);

      selectElement.value = "tech";
      expect(selectElement.checkValidity()).toBe(true);
    });
  });

  describe("イベント", () => {
    test("changeイベントが正しく転送される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      const spSelect = getSpSelect();
      const selectElement = getSelectElement();
      let eventFired = false;

      spSelect.addEventListener("change", () => {
        eventFired = true;
      });

      selectElement.dispatchEvent(new Event("change"));

      expect(eventFired).toBe(true);
    });
  });

  describe("アクセシビリティ", () => {
    test("ラベルがaria-labelとして設定される", () => {
      document.body.innerHTML = `
        <sp-select label="カテゴリー">
          <option value="tech">テクノロジー</option>
        </sp-select>
      `;

      const selectElement = getSelectElement();

      expect(selectElement.getAttribute("aria-label")).toBe("カテゴリー");
    });

    test("エラーメッセージとaria-describedbyで関連付けられる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-select>
      `;

      const selectElement = getSelectElement();
      const errorContainer = getErrorContainer();

      // エラーコンテナのIDがaria-describedbyに設定される
      expect(selectElement.getAttribute("aria-describedby")).toBe(
        errorContainer.id,
      );
    });

    test("ヘルプテキストとaria-describedbyで関連付けられる", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <div slot="help-text">ヘルプメッセージ</div>
        </sp-select>
      `;

      const selectElement = getSelectElement();
      const helpContainer = getHelpContainer();

      expect(selectElement.getAttribute("aria-describedby")).toBe(
        helpContainer.id,
      );
    });

    test("エラーとヘルプテキストの両方がaria-describedbyに設定される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <div slot="help-text">ヘルプメッセージ</div>
          <sp-error-text slot="error-text">エラーメッセージ</sp-error-text>
        </sp-select>
      `;

      const selectElement = getSelectElement();
      const helpContainer = getHelpContainer();
      const errorContainer = getErrorContainer();

      const describedBy = selectElement.getAttribute("aria-describedby");
      expect(describedBy).toContain(helpContainer.id);
      expect(describedBy).toContain(errorContainer.id);
    });
  });

  describe("observedAttributes", () => {
    test("observedAttributesに必要な属性が全て含まれている", () => {
      const observedAttributes = SpSelect.observedAttributes;
      const expectedAttributes = [
        "value",
        "disabled",
        "name",
        "required",
        "label",
        "orientation",
      ];

      expectedAttributes.forEach((attr) => {
        expect(observedAttributes).toContain(attr);
      });
    });
  });

  describe("複雑なシナリオ", () => {
    test("全ての機能を組み合わせて使用できる", () => {
      document.body.innerHTML = `
        <sp-select 
          label="カテゴリー"
          name="category"
          required
          orientation="horizontal"
          value="tech">
          <option value="">選択してください</option>
          <option value="tech">テクノロジー</option>
          <option value="business">ビジネス</option>
          <sp-error-text slot="error-text">カテゴリーは必須です</sp-error-text>
          <div slot="help-text">適切なカテゴリーを選択してください</div>
        </sp-select>
      `;

      const selectElement = getSelectElement();
      const labelElement = getLabelElement();
      const wrapperElement = getWrapperElement();

      expect(labelElement.textContent).toBe("カテゴリー");
      expect(labelElement.hasAttribute("required")).toBe(true);
      expect(selectElement.name).toBe("category");
      expect(selectElement.required).toBe(true);
      expect(selectElement.value).toBe("tech");
      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
    });

    test("動的な値の変更が全て正しく反映される", () => {
      document.body.innerHTML = `
        <sp-select>
          <option value="option1">オプション1</option>
          <option value="option2">オプション2</option>
        </sp-select>
      `;

      // 複数の属性を順次変更
      const spSelect = getSpSelect();
      spSelect.label = "動的ラベル";
      spSelect.value = "option2";
      spSelect.required = true;
      spSelect.orientation = "horizontal";

      const selectElement = getSelectElement();
      const labelElement = getLabelElement();
      const wrapperElement = getWrapperElement();

      expect(labelElement.textContent).toBe("動的ラベル");
      expect(selectElement.value).toBe("option2");
      expect(selectElement.required).toBe(true);
      expect(wrapperElement.getAttribute("data-orientation")).toBe(
        "horizontal",
      );
    });
  });
});
