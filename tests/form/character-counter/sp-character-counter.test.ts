import "../../../src/components/form/character-counter/sp-character-counter";

import { describe, expect, test } from "vitest";

import type { SpCharacterCounter } from "../../../src/components/form/character-counter/sp-character-counter";

function getSpCharacterCounter() {
  return document.querySelector("sp-character-counter") as SpCharacterCounter;
}

function getCurrentCountElement() {
  return document
    .querySelector("sp-character-counter")!
    .shadowRoot!.querySelector(".current-count") as HTMLSpanElement;
}

function getMaxCountElement() {
  return document
    .querySelector("sp-character-counter")!
    .shadowRoot!.querySelector(".max-count") as HTMLSpanElement;
}

describe("sp-character-counter", () => {
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

    test("2桁以上の数値は0埋めされない", () => {
      document.body.innerHTML =
        "<sp-character-counter current='123'></sp-character-counter>";

      const currentCount = getCurrentCountElement();

      expect(currentCount.textContent).toBe("123");
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

    test("2桁以上の数値は0埋めされない", () => {
      document.body.innerHTML =
        "<sp-character-counter max='123'></sp-character-counter>";

      const maxCount = getMaxCountElement();

      expect(maxCount.textContent).toBe("123");
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

      spCharacterCounter.setAttribute("current", "10");
      expect(currentCount.classList.contains("limit-reached")).toBe(true);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });

    test("max属性が変更されると、limit-reachedクラスとlimit-exceededクラスが更新される", () => {
      document.body.innerHTML =
        "<sp-character-counter current='10' max='10'></sp-character-counter>";

      const spCharacterCounter = getSpCharacterCounter();
      const currentCount = getCurrentCountElement();

      spCharacterCounter.setAttribute("max", "15");
      expect(currentCount.classList.contains("limit-reached")).toBe(false);
      expect(currentCount.classList.contains("limit-exceeded")).toBe(false);
    });
  });
});
