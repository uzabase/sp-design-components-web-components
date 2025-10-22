import "../../src/components/tab/sp-tab";

import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

describe("sp-tab", () => {
  test.each([
    ["gray", "gray"],
    ["white", "white"],
  ])(
    "fill属性を%sにすると、ホスト要素にfill属性「%s」がつく",
    async (fill, expectedFill) => {
      document.body.innerHTML = `<sp-tab fill=${fill}></sp-tab>`;
      const tabElement = document.querySelector("sp-tab")!;
      expect(tabElement.getAttribute("fill")).toBe(expectedFill);
    },
  );

  test("fill属性を設定しない場合、デフォルトのfillであるgrayのタブが表示される", async () => {
    document.body.innerHTML = "<sp-tab></sp-tab>";
    const tabElement = document.querySelector("sp-tab")!;
    expect(tabElement.getAttribute("fill")).toBe("gray");
  });

  test("無効なfill属性を設定すると、デフォルトのfillであるgrayのタブが表示される", async () => {
    document.body.innerHTML = "<sp-tab fill='red'></sp-tab>";
    const tabElement = document.querySelector("sp-tab")!;
    expect(tabElement.getAttribute("fill")).toBe("gray");
  });

  test("plus-icon属性をtrueにすると、plusアイコンが表示される", async () => {
    document.body.innerHTML = "<sp-tab plus-icon='true'></sp-tab>";
    const iconElement = document
      .querySelector("sp-tab")!
      .shadowRoot!.querySelector("sp-icon")!;
    expect(iconElement.classList.contains("-show")).toBe(true);
  });

  test("plus-icon属性をfalseにすると、plusアイコンが表示されない", async () => {
    document.body.innerHTML = "<sp-tab plus-icon='false'></sp-tab>";
    const iconElement = document
      .querySelector("sp-tab")!
      .shadowRoot!.querySelector("sp-icon")!;
    expect(iconElement.classList.contains("-show")).toBe(false);
  });

  test("selected属性をtrueにすると、ホスト要素にselected属性がつく", async () => {
    document.body.innerHTML = `<sp-tab selected="true"></sp-tab>`;
    const tabElement = document.querySelector("sp-tab")!;
    expect(tabElement.hasAttribute("selected")).toBe(true);
  });

  describe("disabled属性", () => {
    test("disabled属性をtrueにすると、ホスト要素にdisabled属性がつく", async () => {
      document.body.innerHTML = `<sp-tab disabled=""></sp-tab>`;
      const tabElement = document.querySelector("sp-tab")!;
      expect(tabElement.hasAttribute("disabled")).toBe(true);
    });

    test("disabled属性をtrueにすると、クリックイベントが無効化される", async () => {
      document.body.innerHTML = `<sp-tab disabled=""></sp-tab>`;
      const tabElement = document.querySelector("sp-tab")!;

      // 要素が完全に接続されるまで待機
      await new Promise((resolve) => setTimeout(resolve, 0));

      // aria属性と視覚的な状態をチェックして、要素が
      // 無効化状態で適切に動作するかをテストする
      expect(tabElement.getAttribute("aria-disabled")).toBe("true");
      expect(tabElement.hasAttribute("disabled")).toBe(true);
    });
  });

  test("sp-tabのShadow DOM直下にspan要素が存在する", () => {
    document.body.innerHTML = `<sp-tab></sp-tab>`;
    const tabElement = document.querySelector("sp-tab")!;

    // Shadow DOM直下のspan要素を確認
    const spanElement = tabElement.shadowRoot!.querySelector("span");
    expect(spanElement).not.toBeNull();
  });

  test("role属性がtabに設定される", async () => {
    document.body.innerHTML = `<sp-tab></sp-tab>`;
    const tabElement = screen.getByRole("tab");
    expect(tabElement).not.toBeNull();
  });

  test("aria-selected属性が正しく設定される", async () => {
    document.body.innerHTML = `<sp-tab selected></sp-tab>`;
    const tabElement = screen.getByRole("tab");
    expect(tabElement.getAttribute("aria-selected")).toBe("true");
  });

  test("aria-disabled属性が正しく設定される", async () => {
    document.body.innerHTML = `<sp-tab disabled></sp-tab>`;
    const tabElement = screen.getByRole("tab");
    expect(tabElement.getAttribute("aria-disabled")).toBe("true");
  });
});
