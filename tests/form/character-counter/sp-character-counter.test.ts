import { beforeEach, describe, expect, test } from "vitest";

import { SpCharacterCounter } from "../../../src/components/form/character-counter/sp-character-counter";

function getSpCharacterCounter() {
  return document.querySelector("sp-character-counter") as SpCharacterCounter;
}

function getBaseElement() {
  return document
    .querySelector("sp-character-counter")!
    .shadowRoot!.querySelector(".base") as HTMLDivElement;
}

function getCurrentCountElement() {
  return document
    .querySelector("sp-character-counter")!
    .shadowRoot!.querySelector(".current-count") as HTMLSpanElement;
}

function getSeparatorElement() {
  return document
    .querySelector("sp-character-counter")!
    .shadowRoot!.querySelector(".separator") as HTMLSpanElement;
}

function getMaxCountElement() {
  return document
    .querySelector("sp-character-counter")!
    .shadowRoot!.querySelector(".max-count") as HTMLSpanElement;
}

describe("sp-character-counter", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("基本構造", () => {
    test("shadow DOMが正しく構築される", () => {
      document.body.innerHTML = "<sp-character-counter></sp-character-counter>";

      const baseElement = getBaseElement();
      const currentCount = getCurrentCountElement();
      const separator = getSeparatorElement();
      const maxCount = getMaxCountElement();

      expect(baseElement).not.toBeNull();
      expect(baseElement.classList.contains("base")).toBe(true);
      expect(currentCount).not.toBeNull();
      expect(currentCount.classList.contains("current-count")).toBe(true);
      expect(separator).not.toBeNull();
      expect(separator.classList.contains("separator")).toBe(true);
      expect(separator.textContent).toBe("/");
      expect(maxCount).not.toBeNull();
      expect(maxCount.classList.contains("max-count")).toBe(true);
    });

    test("要素が正しい順序で配置される", () => {
      document.body.innerHTML = "<sp-character-counter></sp-character-counter>";

      const baseElement = getBaseElement();
      const children = Array.from(baseElement.children);

      expect(children).toHaveLength(3);
      expect(children[0].classList.contains("current-count")).toBe(true);
      expect(children[1].classList.contains("separator")).toBe(true);
      expect(children[2].classList.contains("max-count")).toBe(true);
    });
  });

  describe("current属性", () => {
    test("current属性を設定すると、現在の文字数としてその値が表示される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("05");
    });

    test("current属性を設定しない場合、現在の文字数としてデフォルト値の「00」が表示される", () => {
      document.body.innerHTML = "<sp-character-counter></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("00");
    });

    test("current属性を更新すると、現在の文字数の表示が更新される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='3'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      spCharacterCounter.setAttribute("current", "10");

      expect(currentCount.textContent).toBe("10");
    });

    test("プロパティ経由でcurrentを設定できる", () => {
      document.body.innerHTML = "<sp-character-counter></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      spCharacterCounter.current = 7;

      expect(currentCount.textContent).toBe("07");
      expect(spCharacterCounter.getAttribute("current")).toBe("7");
    });

    test("プロパティ経由でcurrentを取得できる", () => {
      document.body.innerHTML =
        "<sp-character-counter current='15'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();

      expect(spCharacterCounter.current).toBe(15);
    });

    test("無効な値（NaN）が設定された場合、現在の文字数の表示が更新されない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      spCharacterCounter.setAttribute("current", "invalid");

      expect(currentCount.textContent).toBe("05");
    });

    test("負の値が設定された場合、現在の文字数の表示が更新されない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='-5'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("00");
    });

    test("小数点を含む値が設定された場合、そのまま表示される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5.7'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("5.7");
    });

    test("0が設定された場合、「00」が表示される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='0'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("00");
    });

    test("1桁の数値は0埋めされる", () => {
      document.body.innerHTML =
        "<sp-character-counter current='9'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("09");
    });

    test("2桁以上の数値は0埋めされない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='123'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("123");
    });

    test("空文字が設定された場合、デフォルト値が使用される", () => {
      document.body.innerHTML =
        "<sp-character-counter current=''></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("00");
    });
  });

  describe("max属性", () => {
    test("max属性を設定すると、最大文字数としてその値が表示される", () => {
      document.body.innerHTML =
        "<sp-character-counter max='10'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("10");
    });

    test("max属性を設定しない場合、最大文字数としてデフォルト値の「00」が表示される", () => {
      document.body.innerHTML = "<sp-character-counter></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("00");
    });

    test("max属性を更新すると、最大文字数の表示が更新される", () => {
      document.body.innerHTML =
        "<sp-character-counter max='5'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const maxCount = getMaxCountElement();

      spCharacterCounter.setAttribute("max", "20");

      expect(maxCount.textContent).toBe("20");
    });

    test("プロパティ経由でmaxを設定できる", () => {
      document.body.innerHTML = "<sp-character-counter></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const maxCount = getMaxCountElement();

      spCharacterCounter.max = 50;

      expect(maxCount.textContent).toBe("50");
      expect(spCharacterCounter.getAttribute("max")).toBe("50");
    });

    test("プロパティ経由でmaxを取得できる", () => {
      document.body.innerHTML =
        "<sp-character-counter max='100'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();

      expect(spCharacterCounter.max).toBe(100);
    });

    test("無効な値（NaN）が設定された場合、最大文字数の表示が更新されない", () => {
      document.body.innerHTML =
        "<sp-character-counter max='5'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const maxCount = getMaxCountElement();

      spCharacterCounter.setAttribute("max", "invalid");

      expect(maxCount.textContent).toBe("05");
    });

    test("負の値が設定された場合、最大文字数の表示が更新されない", () => {
      document.body.innerHTML =
        "<sp-character-counter max='-5'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("00");
    });

    test("小数点を含む値が設定された場合、そのまま表示される", () => {
      document.body.innerHTML =
        "<sp-character-counter max='10.9'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("10.9");
    });

    test("0が設定された場合、「00」が表示される", () => {
      document.body.innerHTML =
        "<sp-character-counter max='0'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("00");
    });

    test("1桁の数値は0埋めされる", () => {
      document.body.innerHTML =
        "<sp-character-counter max='7'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("07");
    });

    test("2桁以上の数値は0埋めされない", () => {
      document.body.innerHTML =
        "<sp-character-counter max='999'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("999");
    });

    test("空文字が設定された場合、デフォルト値が使用される", () => {
      document.body.innerHTML =
        "<sp-character-counter max=''></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("00");
    });
  });

  describe("文字数制限のロジック", () => {
    test("current < maxの場合、limit-reachedクラスもlimit-exceededクラスも付与されない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5' max='10'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });

    test("current === maxの場合、limit-reachedクラスが付与されるが、limit-exceededクラスは付与されない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='10' max='10'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.classList.contains("limit-reached")).toBe(true);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });

    test("current > maxの場合、limit-exceededクラスが付与されるが、limit-reachedクラスは付与されない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='15' max='10'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(true);
    });

    test("current属性が変更されると、limit-reachedクラスとlimit-exceededクラスが更新される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5' max='10'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      // 制限に達した場合
      spCharacterCounter.setAttribute("current", "10");
      expect(currentCount.classList.contains("limit-reached")).toBe(true);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);

      // 制限を超えた場合
      spCharacterCounter.setAttribute("current", "15");
      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(true);

      // 制限内に戻った場合
      spCharacterCounter.setAttribute("current", "8");
      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });

    test("max属性が変更されると、limit-reachedクラスとlimit-exceededクラスが更新される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='10' max='10'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      // 制限を緩くした場合
      spCharacterCounter.setAttribute("max", "15");
      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);

      // 制限を厳しくした場合（超過）
      spCharacterCounter.setAttribute("max", "8");
      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(true);

      // 制限を厳しくした場合（ちょうど）
      spCharacterCounter.setAttribute("max", "10");
      expect(currentCount.classList.contains("limit-reached")).toBe(true);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });

    test("current=0, max=0の場合、limit-reachedクラスが付与される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='0' max='0'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.classList.contains("limit-reached")).toBe(true);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });

    test("プロパティ経由で値を変更した場合もクラスが更新される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5' max='10'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      spCharacterCounter.current = 10;
      expect(currentCount.classList.contains("limit-reached")).toBe(true);

      spCharacterCounter.max = 8;
      expect(currentCount.classList.contains("limit-exceeded")).toBe(true);
    });
  });

  describe("observedAttributes", () => {
    test("observedAttributesに'current'と'max'が含まれている", () => {
      const observedAttributes = SpCharacterCounter.observedAttributes;

      expect(observedAttributes).toContain("current");
      expect(observedAttributes).toContain("max");
      expect(observedAttributes).toHaveLength(2);
    });
  });

  describe("エラーハンドリング", () => {
    test("同じ値を再設定しても不要な更新は行われない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='5' max='10'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();
      const initialText = currentCount.textContent;

      // 同じ値を設定
      spCharacterCounter.setAttribute("current", "5");

      expect(currentCount.textContent).toBe(initialText);
    });

    test("非常に大きな数値も正しく処理される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='999999' max='1000000'></sp-character-counter>";

      const currentCount = getCurrentCountElement();
      const maxCount = getMaxCountElement();

      expect(currentCount.textContent).toBe("999999");
      expect(maxCount.textContent).toBe("1000000");
    });
  });
});
