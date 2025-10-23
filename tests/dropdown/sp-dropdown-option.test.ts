import "../../src/components/dropdown/sp-dropdown-option";

import { describe, expect, test } from "vitest";

import type { SpDropdownOption } from "../../src/components/dropdown/sp-dropdown-option";

function getSpDropdownOption() {
  return document.querySelector("sp-dropdown-option") as SpDropdownOption;
}

describe("sp-dropdown-option", () => {
  describe("text属性", () => {
    test("text属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option text="Text"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.text).toBe("Text");
    });

    test("text属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option></sp-dropdown-option>
      `;
      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.text).toBe("");
    });

    test("text属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option text="Text"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.text).toBe("Text");

      spDropdownOption.setAttribute("text", "NewText");
      expect(spDropdownOption.text).toBe("NewText");
    });
  });
  describe("value属性", () => {
    test("value属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option value="Value"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.value).toBe("Value");
    });

    test("value属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option></sp-dropdown-option>
      `;
      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.value).toBe("");
    });

    test("value属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option value="Value"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.value).toBe("Value");

      spDropdownOption.setAttribute("value", "NewValue");
      expect(spDropdownOption.value).toBe("NewValue");
    });
  });
  describe("selectType属性", () => {
    test.each(["single", "multiple"])(
      "selectType属性に%sを設定できる",
      async (value) => {
        document.body.innerHTML = `
        <sp-dropdown-option select-type="${value}"></sp-dropdown-option>
      `;

        const spDropdownOption = getSpDropdownOption();
        expect(spDropdownOption.selectType).toBe(value);
      },
    );

    test("selectType属性を設定しないと、singleになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.selectType).toBe("single");
    });

    test("selectType属性に不正な値を設定すると、singleになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option select-type="invalid"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.selectType).toBe("single");
    });

    test("selectType属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option select-type="single"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.selectType).toBe("single");

      spDropdownOption.setAttribute("select-type", "multiple");
      expect(spDropdownOption.selectType).toBe("multiple");
    });
  });
  describe("selected属性", () => {
    test("selected属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option selected="true"></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      expect(spDropdownOption.selected).toBe(true);
    });

    test("selected属性を更新すると、選択状態が変わる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-option></sp-dropdown-option>
      `;

      const spDropdownOption = getSpDropdownOption();
      spDropdownOption.setAttribute("selected", "true");
      expect(spDropdownOption.selected).toBe(true);

      spDropdownOption.setAttribute("selected", "false");
      expect(spDropdownOption.selected).toBe(false);
    });
  });
});
