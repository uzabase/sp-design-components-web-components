import "../../src/components/elementTitle/sp-element-title";

import { describe, expect, test } from "vitest";

import type { SpElementTitle } from "../../src/components/elementTitle/sp-element-title";

function getSpElementTitle() {
  return document.querySelector("sp-element-title") as SpElementTitle;
}

describe("sp-element-title", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", async () => {
      document.body.innerHTML =
        "<sp-element-title>サンプルタイトル</sp-element-title>";

      const headingElement = getSpElementTitle();

      expect(headingElement.textContent).toBe("サンプルタイトル");
    });
  });
});
