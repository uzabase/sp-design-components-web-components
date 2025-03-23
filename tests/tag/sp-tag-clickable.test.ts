import "../../src/components/tag/sp-tag-clickable";

import { screen } from "shadow-dom-testing-library";
import { describe, expect, test, vi } from "vitest";

import type { SpTagClickable } from "../../src/components/tag/sp-tag-clickable";

function getSpTagClickable() {
  return document.querySelector("sp-tag-clickable") as SpTagClickable;
}

function getButton(): HTMLButtonElement {
  return screen.getByShadowRole("button") as HTMLButtonElement;
}

describe("sp-tag-clickable", () => {
  describe("デフォルト状態", () => {
    test("selected属性が設定されていない場合、selectedがfalseになる", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      expect(tagClickable.hasAttribute("selected")).toBe(false);
    });

    test("disabled属性が設定されていない場合、disabledがfalseになる", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      expect(tagClickable.hasAttribute("disabled")).toBe(false);
      expect(tagClickable.hasAttribute("aria-disabled")).toBe(false);
    });
  });

  describe("selected属性", () => {
    test("selected属性を設定すると、selectedがtrueになる", () => {
      document.body.innerHTML = `<sp-tag-clickable selected>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      expect(tagClickable.hasAttribute("selected")).toBe(true);
    });

    test("selected属性を更新すると、属性が更新される", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      tagClickable.setAttribute("selected", "");
      expect(tagClickable.hasAttribute("selected")).toBe(true);

      tagClickable.removeAttribute("selected");
      expect(tagClickable.hasAttribute("selected")).toBe(false);
    });

    test("selectedプロパティを変更すると、属性も変更される", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      tagClickable.selected = true;
      expect(tagClickable.hasAttribute("selected")).toBe(true);

      tagClickable.selected = false;
      expect(tagClickable.hasAttribute("selected")).toBe(false);
    });
  });

  describe("disabled属性", () => {
    test("disabled属性を設定すると、disabledがtrueになる", () => {
      document.body.innerHTML = `<sp-tag-clickable disabled>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      expect(tagClickable.hasAttribute("disabled")).toBe(true);
      expect(tagClickable.hasAttribute("aria-disabled")).toBe(true);
    });

    test("disabled属性を更新すると、属性が更新される", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      tagClickable.setAttribute("disabled", "");
      expect(tagClickable.hasAttribute("disabled")).toBe(true);
      expect(tagClickable.hasAttribute("aria-disabled")).toBe(true);

      tagClickable.removeAttribute("disabled");
      expect(tagClickable.hasAttribute("disabled")).toBe(false);
      expect(tagClickable.hasAttribute("aria-disabled")).toBe(false);
    });

    test("disabledプロパティを変更すると、属性も変更される", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      tagClickable.disabled = true;
      expect(tagClickable.hasAttribute("disabled")).toBe(true);
      expect(tagClickable.hasAttribute("aria-disabled")).toBe(true);

      tagClickable.disabled = false;
      expect(tagClickable.hasAttribute("disabled")).toBe(false);
      expect(tagClickable.hasAttribute("aria-disabled")).toBe(false);
    });
  });

  describe("クリックイベント", () => {
    test("クリック時にclickイベントが発火する", () => {
      document.body.innerHTML = `<sp-tag-clickable>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      const clickHandler = vi.fn();
      tagClickable.addEventListener("click", clickHandler);

      const button = getButton();
      button.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    test("disabled状態の場合、clickイベントが発火しない", () => {
      document.body.innerHTML = `<sp-tag-clickable disabled>Tag</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      const clickHandler = vi.fn();
      tagClickable.addEventListener("click", clickHandler);

      const button = getButton();
      button.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });
});
