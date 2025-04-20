import "../../src/components/tag/sp-tag-liquid";

import { describe, expect, test } from "vitest";

import type { SpTagLiquid } from "../../src/components/tag/sp-tag-liquid";

function getSpTagLiquid() {
  return document.querySelector("sp-tag-liquid") as SpTagLiquid;
}

function getBaseElement(element: SpTagLiquid): HTMLElement {
  return element.shadowRoot!.querySelector(".base") as HTMLElement;
}

describe("sp-tag-liquid", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", async () => {
      document.body.innerHTML = `<sp-tag-liquid>Hello, World!</sp-tag-liquid>`;

      const spTagLiquid = await getSpTagLiquid();
      const slot = spTagLiquid.shadowRoot!.querySelector(
        "slot",
      ) as HTMLSlotElement;
      const [text] = slot.assignedNodes();
      expect(text.textContent).toBe("Hello, World!");
    });
  });

  describe("type属性", () => {
    test("type属性にgreenを設定すると、クラスにtype__greenが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("type__green")).toBe(true);
    });

    test("type属性を設定しない場合、クラスにデフォルト値のtype__grayが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid>Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("type__gray")).toBe(true);
    });

    test("type属性を更新すると、クラスから古い値が削除され、新しい値が設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      tagLiquid.setAttribute("type", "blue");
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("type__green")).toBe(false);
      expect(baseElement.classList.contains("type__blue")).toBe(true);
    });

    test("無効なtype属性を設定すると、クラスにデフォルト値のtype__grayが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid type="invalid">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("type__gray")).toBe(true);
    });

    test.each([
      ["gray", "type__gray"],
      ["green", "type__green"],
      ["red", "type__red"],
      ["yellow", "type__yellow"],
      ["blue", "type__blue"],
    ])(
      "type属性に%sを設定すると、クラスに%sが設定される",
      (type, className) => {
        document.body.innerHTML = `<sp-tag-liquid type="${type}">Hello, World!</sp-tag-liquid>`;

        const tagLiquid = getSpTagLiquid();
        const baseElement = getBaseElement(tagLiquid);

        expect(baseElement.classList.contains(className)).toBe(true);
      },
    );
  });

  describe("light属性", () => {
    test("light属性にtrueを設定すると、クラスにlightが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green" light="true">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("light")).toBe(true);
    });

    test("light属性に空文字を設定すると、クラスにlightが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green" light="">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("light")).toBe(true);
    });

    test("light属性にfalseを設定すると、クラスにlightが設定されない", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green" light="false">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("light")).toBe(false);
    });

    test("light属性を設定しない場合、クラスにlightが設定されない", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("light")).toBe(false);
    });

    test("light属性を更新すると、クラスのlight設定が更新される", () => {
      document.body.innerHTML = `<sp-tag-liquid type="green">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      tagLiquid.setAttribute("light", "");

      const baseElement = getBaseElement(tagLiquid);
      expect(baseElement.classList.contains("light")).toBe(true);
    });
  });
});
