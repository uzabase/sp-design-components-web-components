import "../../../src/components/form/label/sp-label";

import { describe, expect, test } from "vitest";

import type { SpLabel } from "../../../src/components/form/label/sp-label";

function getSpLabel() {
  return document.querySelector("sp-label") as SpLabel;
}

function getRequiredMark() {
  const spLabel = getSpLabel();
  return spLabel.shadowRoot!.querySelector("span");
}

function queryRequiredMark() {
  const spLabel = getSpLabel();
  return spLabel.shadowRoot!.querySelector("span");
}

describe("sp-label", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", () => {
      document.body.innerHTML = "<sp-label>Hello, World!</sp-label>";

      const spLabel = getSpLabel();
      expect(spLabel.textContent).toBe("Hello, World!");
    });
  });

  describe("required属性", () => {
    test("required属性にtrueを設定すると、必須マークが表示される", () => {
      document.body.innerHTML =
        "<sp-label required='true'>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark!.textContent).toBe("*");
    });

    test("required属性に空文字列を設定すると、必須マークが表示される", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark!.textContent).toBe("*");
    });

    test("required属性にfalseを設定すると、必須マークは表示されない", () => {
      document.body.innerHTML =
        "<sp-label required='false'>テストラベル</sp-label>";

      const requiredMark = queryRequiredMark();

      expect(requiredMark).toBeNull();
    });

    test("required属性を更新すると、必須マークの表示に更新後の値が反映される", () => {
      document.body.innerHTML =
        "<sp-label required='true'>テストラベル</sp-label>";

      const spLabel = getSpLabel();
      spLabel.setAttribute("required", "false");

      const requiredMark = queryRequiredMark();
      expect(requiredMark).toBeNull();
    });

    test("required属性を設定しない場合、必須マークは表示されない", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const requiredMark = queryRequiredMark();

      expect(requiredMark).toBeNull();
    });
  });
});
