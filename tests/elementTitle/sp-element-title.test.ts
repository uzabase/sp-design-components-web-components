import { describe, expect, test } from "vitest";
import { getByShadowRole } from "shadow-dom-testing-library";
import { SpElementTitle } from "../../src/components/elementTitle/sp-element-title";
import "../../src/components/elementTitle/sp-element-title";

function getSpElementTitle() {
  return document.querySelector("sp-element-title") as SpElementTitle;
}

function getHeadingElement() {
  return getByShadowRole(document.body, "heading");
}

describe("sp-element-title", () => {
  describe("text属性", () => {
    test("text属性を設定すると、そのテキストが見出しとして表示される", async () => {
      document.body.innerHTML =
        "<sp-element-title text='サンプルタイトル'></sp-element-title>";

      const headingElement = getHeadingElement();

      expect(headingElement.textContent).toBe("サンプルタイトル");
    });

    test("text属性を更新すると、更新後のテキストが表示される", async () => {
      document.body.innerHTML =
        "<sp-element-title text='初期タイトル'></sp-element-title>";

      const spElementTitle = getSpElementTitle();
      const headingElement = getHeadingElement();

      spElementTitle.setAttribute("text", "更新後タイトル");

      expect(headingElement.textContent).toBe("更新後タイトル");
    });
  });
});
