import { describe, expect, test } from "vitest";
import { SpDropdownOption } from "../../src/components/dropdown/sp-dropdown-option";
import "../../src/components/dropdown/sp-dropdown-option";

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
  describe("selectType属性", () => {});
  describe("selected属性", () => {});
  describe("onClick属性", () => {});
});
