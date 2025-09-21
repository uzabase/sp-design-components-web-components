import "../../../src/components/form/label/sp-label";

import { describe, expect, test } from "vitest";

import type { SpLabel } from "../../../src/components/form/label/sp-label";

function getSpLabel() {
  return document.querySelector("sp-label") as SpLabel;
}

function getLabelElement() {
  return document
    .querySelector("sp-label")!
    .shadowRoot!.querySelector(".label") as HTMLLabelElement;
}

function getRequiredMark() {
  return document
    .querySelector("sp-label")!
    .shadowRoot!.querySelector(".required") as HTMLSpanElement;
}

describe("sp-label", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", () => {
      document.body.innerHTML = "<sp-label>ラベルテキスト</sp-label>";

      const spLabel = getSpLabel();
      const labelElement = getLabelElement();

      expect(spLabel.textContent).toBe("ラベルテキスト");
      expect(labelElement).not.toBeNull();
    });
  });

  describe("required属性", () => {
    test("required属性を設定すると、必須マークが表示される", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.textContent).toBe("*");
    });

    test("required属性を設定しない場合、必須マークは表示されない", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark).toBeNull();
    });

    test("required='true'を設定すると、必須マークが表示される", () => {
      document.body.innerHTML =
        "<sp-label required='true'>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.textContent).toBe("*");
    });

    test("required='false'を設定すると、必須マークは表示されない", () => {
      document.body.innerHTML =
        "<sp-label required='false'>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark).toBeNull();
    });

    test("required属性を更新すると、必須マークの表示が更新される", () => {
      document.body.innerHTML = "<sp-label>テストラベル</sp-label>";

      const spLabel = getSpLabel();

      spLabel.setAttribute("required", "true");
      expect(getRequiredMark().textContent).toBe("*");
    });
  });

  describe("アクセシビリティ", () => {
    test("必須マークにaria-hidden='true'が設定されている", () => {
      document.body.innerHTML = "<sp-label required>テストラベル</sp-label>";

      const requiredMark = getRequiredMark();

      expect(requiredMark.getAttribute("aria-hidden")).toBe("true");
    });
  });
});
