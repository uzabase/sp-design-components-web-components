import "../../src/components/tag/sp-tag-clickable";

import userEvent from "@testing-library/user-event";
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
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", async () => {
      document.body.innerHTML = `<sp-tag-clickable>Hello, World!</sp-tag-clickable>`;

      const spTagClickable = await getSpTagClickable();
      const slot = spTagClickable.shadowRoot!.querySelector(
        "slot",
      ) as HTMLSlotElement;
      const [text] = slot.assignedNodes();
      expect(text.textContent).toBe("Hello, World!");
    });
  });

  describe("selected属性", () => {
    test("selected属性を設定すると、isSelectedクラスが追加される", () => {
      document.body.innerHTML = `<sp-tag-clickable selected>Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isSelected")).toBe(true);
    });

    test("selected属性を削除すると、isSelectedクラスが削除される", () => {
      document.body.innerHTML = `<sp-tag-clickable selected>Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();
      tagClickable.removeAttribute("selected");

      const button = getButton();
      expect(button.classList.contains("isSelected")).toBe(false);
    });

    test("selected属性にtrueを設定すると、クラスにisSelectedが設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable selected="true">Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isSelected")).toBe(true);
    });

    test("selected属性に空文字列を設定すると、クラスにisSelectedが設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable selected>Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isSelected")).toBe(true);
    });

    test("selected属性にfalseを設定すると、クラスにisSelectedが設定されない", async () => {
      document.body.innerHTML = `<sp-tag-clickable selected="false">Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isSelected")).toBe(false);
    });

    test("selected属性を更新すると、クラスに更新後の値が反映される", async () => {
      document.body.innerHTML = `<sp-tag-clickable selected="true">Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();
      const button = getButton();

      tagClickable.setAttribute("selected", "false");
      expect(button.classList.contains("isSelected")).toBe(false);
    });

    test("selected属性を設定しない場合、isSelectedクラスは設定されない", async () => {
      document.body.innerHTML = `<sp-tag-clickable>Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isSelected")).toBe(false);
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、ボタン要素にisDisabledクラスが設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled="true">Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isDisabled")).toBe(true);
    });

    test("disabled属性に空文字列を設定すると、ボタン要素にisDisabledクラスが設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled>Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isDisabled")).toBe(true);
    });

    test("disabled属性にfalseを設定すると、ボタン要素にisDisabledクラスが設定されない", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled="false">Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isDisabled")).toBe(false);
    });

    test("disabled属性を更新すると、ボタン要素のisDisabledクラスに更新後の値が反映される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled="true">Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();
      const button = getButton();

      tagClickable.setAttribute("disabled", "false");
      expect(button.classList.contains("isDisabled")).toBe(false);
    });

    test("disabled属性を設定しない場合、ボタン要素にisDisabledクラスは設定されない", async () => {
      document.body.innerHTML = `<sp-tag-clickable>Hello, World!</sp-tag-clickable>`;

      const button = getButton();

      expect(button.classList.contains("isDisabled")).toBe(false);
    });

    test("disabled属性が設定されると、aria-disabled属性がtrueに設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled>Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();

      expect(tagClickable.getAttribute("aria-disabled")).toBe("true");
    });

    test("disabledプロパティを変更すると、aria-disabled属性も変更される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled>Hello, World!</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      tagClickable.disabled = false;
      expect(tagClickable.getAttribute("aria-disabled")).toBe(null);
    });

    test("disabled属性にtrueを設定すると、aria-disabled属性がtrueに設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled="true">Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();

      expect(tagClickable.getAttribute("aria-disabled")).toBe("true");
    });

    test("disabled属性に空文字列を設定すると、aria-disabled属性がtrueに設定される", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled>Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();

      expect(tagClickable.getAttribute("aria-disabled")).toBe("true");
    });

    test("disabled属性にfalseを設定すると、aria-disabled属性は設定されない", async () => {
      document.body.innerHTML = `<sp-tag-clickable disabled="false">Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();

      expect(tagClickable.getAttribute("aria-disabled")).toBe(null);
    });

    test("disabled属性を設定しない場合、aria-disabled属性は設定されない", async () => {
      document.body.innerHTML = `<sp-tag-clickable>Hello, World!</sp-tag-clickable>`;

      const tagClickable = getSpTagClickable();

      expect(tagClickable.getAttribute("aria-disabled")).toBe(null);
    });
  });

  describe("クリックイベント", () => {
    test("クリック時にclickイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-clickable>Hello, World!</sp-tag-clickable>`;
      const tagClickable = getSpTagClickable();

      const clickHandler = vi.fn();
      tagClickable.addEventListener("click", clickHandler);

      const button = getButton();
      await user.click(button);

      expect(clickHandler).toHaveBeenCalled();
    });
  });
});
