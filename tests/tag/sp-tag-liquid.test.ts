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

  describe("color属性", () => {
    test("color属性にgreenを設定すると、クラスにtheme__greenが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="green">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("theme__green")).toBe(true);
    });

    test("color属性を設定しない場合、クラスにデフォルト値のtheme__grayが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid>Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("theme__gray")).toBe(true);
    });

    test("color属性を更新すると、クラスから古い値が削除され、新しい値が設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="green">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      tagLiquid.setAttribute("color", "blue");
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("theme__green")).toBe(false);
      expect(baseElement.classList.contains("theme__blue")).toBe(true);
    });

    test("無効なcolor属性を設定すると、クラスにデフォルト値のtheme__grayが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="invalid">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("theme__gray")).toBe(true);
    });

    test.each([
      ["gray", "theme__gray"],
      ["green", "theme__green"],
      ["red", "theme__red"],
      ["yellow", "theme__yellow"],
      ["blue", "theme__blue"],
    ])(
      "color属性に%sを設定すると、クラスに%sが設定される",
      (color, className) => {
        document.body.innerHTML = `<sp-tag-liquid color="${color}">Hello, World!</sp-tag-liquid>`;

        const tagLiquid = getSpTagLiquid();
        const baseElement = getBaseElement(tagLiquid);

        expect(baseElement.classList.contains(className)).toBe(true);
      },
    );
  });

  describe("mode属性", () => {
    test("mode属性にdarkを設定すると、クラスにmode__darkが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="green" mode="dark">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("mode__dark")).toBe(true);
    });

    test("mode属性を設定しない場合、クラスにデフォルト値のmode__lightが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid>Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("mode__light")).toBe(true);
    });

    test("mode属性を更新すると、クラスから古い値が削除され、新しい値が設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="green" mode="light">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      tagLiquid.setAttribute("mode", "dark");
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("mode__light")).toBe(false);
      expect(baseElement.classList.contains("mode__dark")).toBe(true);
    });

    test("無効なmode属性を設定すると、クラスにデフォルト値のmode__lightが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid mode="invalid">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("mode__light")).toBe(true);
    });

    test.each([
      ["light", "mode__light"],
      ["dark", "mode__dark"],
    ])(
      "color属性がgray以外の場合、mode属性に%sを設定すると、クラスに%sが設定される",
      (mode, className) => {
        document.body.innerHTML = `<sp-tag-liquid color="green" mode="${mode}">Hello, World!</sp-tag-liquid>`;

        const tagLiquid = getSpTagLiquid();
        const baseElement = getBaseElement(tagLiquid);

        expect(baseElement.classList.contains(className)).toBe(true);
      },
    );
  });

  describe("color属性とmode属性の制約", () => {
    test("colorがgrayでmode属性にdarkを設定すると、クラスにmode__lightが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="gray" mode="dark">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("mode__light")).toBe(true);
      expect(baseElement.classList.contains("mode__dark")).toBe(false);
    });

    test("modeがdarkのときにcolor属性をgrayに変更すると、クラスからmode__darkが削除され、mode__lightが設定される", () => {
      document.body.innerHTML = `<sp-tag-liquid color="green" mode="dark">Hello, World!</sp-tag-liquid>`;

      const tagLiquid = getSpTagLiquid();
      const baseElement = getBaseElement(tagLiquid);

      expect(baseElement.classList.contains("mode__dark")).toBe(true);

      tagLiquid.setAttribute("color", "gray");

      expect(baseElement.classList.contains("mode__light")).toBe(true);
      expect(baseElement.classList.contains("mode__dark")).toBe(false);
    });
  });
});
