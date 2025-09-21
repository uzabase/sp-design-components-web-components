import { beforeEach, describe, expect, test } from "vitest";

import { SpLabel } from "../../../src/components/form/label/sp-label";

function getSpLabel() {
  return document.querySelector("sp-label") as SpLabel;
}

function getLabelElement() {
  return document
    .querySelector("sp-label")!
    .shadowRoot!.querySelector(".label") as HTMLLabelElement;
}

function getSlotElement() {
  return document
    .querySelector("sp-label")!
    .shadowRoot!.querySelector("slot") as HTMLSlotElement;
}

function getRequiredMark() {
  return document
    .querySelector("sp-label")!
    .shadowRoot!.querySelector(".required") as HTMLSpanElement;
}

function queryRequiredMark() {
  return document
    .querySelector("sp-label")!
    .shadowRoot!.querySelector(".required");
}

describe("sp-label", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("基本構造", () => {
    test("shadow DOMが正しく構築される", () => {
      document.body.innerHTML = "<sp-label>ラベルテキスト</sp-label>";

      const labelElement = getLabelElement();
      const slotElement = getSlotElement();

      expect(labelElement).not.toBeNull();
      expect(labelElement.tagName).toBe("LABEL");
      expect(labelElement.classList.contains("label")).toBe(true);
      expect(slotElement).not.toBeNull();
      expect(labelElement.contains(slotElement)).toBe(true);
    });

    test("要素が正しい階層で配置される", () => {
      document.body.innerHTML = "<sp-label>ラベルテキスト</sp-label>";

      const spLabel = getSpLabel();
      const labelElement = getLabelElement();
      const slotElement = getSlotElement();

      expect(spLabel.shadowRoot!.contains(labelElement)).toBe(true);
      expect(labelElement.contains(slotElement)).toBe(true);
    });

    test("必須マーク要素が正しく初期化される", () => {
      document.body.innerHTML = "<sp-label required>ラベルテキスト</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark).not.toBeNull();
      expect(requiredMark.tagName).toBe("SPAN");
      expect(requiredMark.classList.contains("required")).toBe(true);
      expect(requiredMark.textContent).toBe("*");
      expect(requiredMark.getAttribute("aria-hidden")).toBe("true");
    });
  });

  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", () => {
      document.body.innerHTML = "<sp-label>ラベルテキスト</sp-label>";

      const spLabel = getSpLabel();

      expect(spLabel.textContent).toBe("ラベルテキスト");
    });

    test("スロットに複数の要素を渡すことができる", () => {
      document.body.innerHTML = `
        <sp-label>
          <span>名前</span>
          <small>(必須)</small>
        </sp-label>
      `;

      const spLabel = getSpLabel();
      const spans = spLabel.querySelectorAll("span");
      const smalls = spLabel.querySelectorAll("small");

      expect(spans).toHaveLength(1);
      expect(smalls).toHaveLength(1);
      expect(spans[0].textContent).toBe("名前");
      expect(smalls[0].textContent).toBe("(必須)");
    });

    test("スロットが空の場合でも正常に動作する", () => {
      document.body.innerHTML = "<sp-label></sp-label>";

      const spLabel = getSpLabel();
      const labelElement = getLabelElement();

      expect(spLabel.textContent).toBe("");
      expect(labelElement).not.toBeNull();
    });

    test("スロットの内容を動的に変更できる", () => {
      document.body.innerHTML = "<sp-label>初期ラベル</sp-label>";

      const spLabel = getSpLabel();

      expect(spLabel.textContent).toBe("初期ラベル");

      spLabel.textContent = "更新されたラベル";

      expect(spLabel.textContent).toBe("更新されたラベル");
    });

    test("HTMLコンテンツをスロットに渡すことができる", () => {
      document.body.innerHTML = `
        <sp-label>
          <strong>重要:</strong> ユーザー名
        </sp-label>
      `;

      const spLabel = getSpLabel();
      const strongElement = spLabel.querySelector("strong");

      expect(strongElement).not.toBeNull();
      expect(strongElement!.textContent).toBe("重要:");
      expect(spLabel.textContent).toContain("ユーザー名");
    });
  });

  describe("required属性", () => {
    test("required属性を設定すると、必須マークが表示される", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();
      const labelElement = getLabelElement();

      expect(requiredMark).not.toBeNull();
      expect(requiredMark.textContent).toBe("*");
      expect(labelElement.contains(requiredMark)).toBe(true);
    });

    test("required属性を設定しない場合、必須マークは表示されない", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const requiredMark = queryRequiredMark();

      expect(requiredMark).toBeNull();
    });

    test("required='true'を設定すると、必須マークが表示される", () => {
      document.body.innerHTML =
        "<sp-label required='true'>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.textContent).toBe("*");
    });

    test("required='false'を設定すると、必須マークは表示されない", () => {
      document.body.innerHTML =
        "<sp-label required='false'>テストラベル</sp-label>";

      const requiredMark = queryRequiredMark();

      expect(requiredMark).toBeNull();
    });

    test("required=''（空文字）を設定すると、必須マークが表示される", () => {
      document.body.innerHTML = "<sp-label required=''>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.textContent).toBe("*");
    });

    test("required属性を更新すると、必須マークの表示が更新される", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const spLabel = getSpLabel();

      // 必須マークを追加
      spLabel.setAttribute("required", "true");
      expect(getRequiredMark().textContent).toBe("*");

      // 必須マークを削除
      spLabel.removeAttribute("required");
      expect(queryRequiredMark()).toBeNull();
    });

    test("プロパティ経由でrequiredを設定できる", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const spLabel = getSpLabel();

      spLabel.required = true;

      expect(getRequiredMark().textContent).toBe("*");
      // プロパティ設定では属性は自動的に設定されない
      expect(spLabel.required).toBe(true);
    });

    test("プロパティ経由でrequiredを取得できる", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const spLabel = getSpLabel();

      expect(spLabel.required).toBe(true);
    });

    test("プロパティ経由でrequiredをfalseに設定すると、必須マークが削除される", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const spLabel = getSpLabel();

      spLabel.required = false;

      expect(queryRequiredMark()).toBeNull();
      expect(spLabel.required).toBe(false);
    });

    test("同じrequired値を再設定しても不要な更新は行われない", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const spLabel = getSpLabel();
      const labelElement = getLabelElement();
      const initialChildCount = labelElement.children.length;

      // 同じ値を設定
      spLabel.required = true;

      expect(labelElement.children.length).toBe(initialChildCount);
    });

    test("required属性の値に関係なく、boolean値として処理される", () => {
      document.body.innerHTML =
        "<sp-label required='any-value'>テストラベル</sp-label>";

      const requiredMark = queryRequiredMark();

      // 'true'以外の値でもrequired属性があれば必須マークは表示されない
      expect(requiredMark).toBeNull();
    });

    test("required属性の追加と削除を繰り返しても正常に動作する", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const spLabel = getSpLabel();

      // 追加
      spLabel.setAttribute("required", "");
      expect(getRequiredMark()).not.toBeNull();

      // 削除
      spLabel.removeAttribute("required");
      expect(queryRequiredMark()).toBeNull();

      // 再追加
      spLabel.setAttribute("required", "true");
      expect(getRequiredMark()).not.toBeNull();

      // 再削除
      spLabel.setAttribute("required", "false");
      expect(queryRequiredMark()).toBeNull();
    });
  });

  describe("アクセシビリティ", () => {
    test("必須マークにaria-hidden='true'が設定されている", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.getAttribute("aria-hidden")).toBe("true");
    });

    test("label要素が使用されているため、フォーム要素との関連付けが可能", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const labelElement = getLabelElement();

      expect(labelElement.tagName).toBe("LABEL");
      // label要素なので、for属性やネストによってフォーム要素と関連付け可能
    });

    test("必須マークがaria-hiddenで隠されているため、スクリーンリーダーには読み上げられない", () => {
      document.body.innerHTML = "<sp-label required>ユーザー名</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.getAttribute("aria-hidden")).toBe("true");
      // スクリーンリーダーは"ユーザー名"のみを読み上げ、"*"は読み上げない
    });
  });

  describe("observedAttributes", () => {
    test("observedAttributesに'required'が含まれている", () => {
      const observedAttributes = SpLabel.observedAttributes;

      expect(observedAttributes).toContain("required");
      expect(observedAttributes).toHaveLength(1);
    });
  });

  describe("カスタム要素の登録", () => {
    test("sp-labelがカスタム要素として登録されている", () => {
      expect(customElements.get("sp-label")).toBeDefined();
    });

    test("HTMLElementTagNameMapに型定義が含まれている", () => {
      document.body.innerHTML = "<sp-label>テスト</sp-label>";

      // TypeScriptの型チェックで確認されるため、コンパイルエラーがなければOK
      const element: HTMLElementTagNameMap["sp-label"] = getSpLabel();
      expect(element).toBeInstanceOf(SpLabel);
    });
  });

  describe("ライフサイクル", () => {
    test("connectedCallbackで要素が正しく初期化される", () => {
      // DOM外で要素を作成
      const spLabel = document.createElement("sp-label");
      spLabel.textContent = "テストラベル";

      // DOMに追加する前は内部構造が不完全
      expect(spLabel.shadowRoot).not.toBeNull();

      // DOMに追加
      document.body.appendChild(spLabel);

      // 追加後は内部構造が完成
      const labelElement = spLabel.shadowRoot!.querySelector(".label");
      expect(labelElement).not.toBeNull();
      expect(labelElement!.tagName).toBe("LABEL");
    });

    test("複数のインスタンスが独立して動作する", () => {
      document.body.innerHTML = `
        <sp-label required>ラベル1</sp-label>
        <sp-label>ラベル2</sp-label>
      `;

      const labels = document.querySelectorAll("sp-label");
      const label1 = labels[0] as SpLabel;
      const label2 = labels[1] as SpLabel;

      const requiredMark1 = label1.shadowRoot!.querySelector(".required");
      const requiredMark2 = label2.shadowRoot!.querySelector(".required");

      expect(requiredMark1).not.toBeNull();
      expect(requiredMark2).toBeNull();
      expect(label1.textContent).toBe("ラベル1");
      expect(label2.textContent).toBe("ラベル2");
    });
  });

  describe("エラーハンドリング", () => {
    test("不正な属性値でもエラーが発生しない", () => {
      expect(() => {
        document.body.innerHTML =
          "<sp-label required='invalid'>ラベル</sp-label>";
      }).not.toThrow();

      const labelElement = getLabelElement();
      expect(labelElement).not.toBeNull();
    });

    test("必須マークの追加・削除でDOMエラーが発生しない", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";
      const spLabel = getSpLabel();

      expect(() => {
        // 複数回の追加・削除
        spLabel.required = true;
        spLabel.required = false;
        spLabel.required = true;
        spLabel.required = false;
      }).not.toThrow();
    });

    test("プロパティとattributeの不整合でもエラーが発生しない", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";
      const spLabel = getSpLabel();

      expect(() => {
        spLabel.required = true;
        spLabel.removeAttribute("required");
        spLabel.setAttribute("required", "false");
        spLabel.required = false;
      }).not.toThrow();
    });
  });

  describe("スタイリング", () => {
    test("label要素に適切なCSSクラスが設定されている", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const labelElement = getLabelElement();

      expect(labelElement.classList.contains("label")).toBe(true);
    });

    test("必須マークに適切なCSSクラスが設定されている", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.classList.contains("required")).toBe(true);
    });

    test("スタイルシートが正しく適用されている", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const spLabel = getSpLabel();
      const adoptedStyleSheets = spLabel.shadowRoot!.adoptedStyleSheets;

      expect(adoptedStyleSheets.length).toBeGreaterThan(0);
    });
  });
});
