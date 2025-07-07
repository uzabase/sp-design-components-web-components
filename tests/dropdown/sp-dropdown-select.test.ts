import "../../src/components/dropdown/sp-dropdown-select";

import { describe, expect, test } from "vitest";

import type { SpDropdownSelect } from "../../src/components/dropdown/sp-dropdown-select";

function getSpDropdownSelect() {
  return document.querySelector("sp-dropdown-select") as SpDropdownSelect;
}

describe("sp-dropdown-select", () => {
  describe("text属性", () => {
    test("text属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select text="Text"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.text).toBe("Text");
    });

    test("text属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select></sp-dropdown-select>
      `;
      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.text).toBe("");
    });

    test("text属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select text="Text"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.text).toBe("Text");

      spDropdownSelect.setAttribute("text", "NewText");
      expect(spDropdownSelect.text).toBe("NewText");
    });
  });

  describe("placeholder属性", () => {
    test("placeholder属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select placeholder="Placeholder"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.placeholder).toBe("Placeholder");
    });

    test("placeholder属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select></sp-dropdown-select>
      `;
      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.placeholder).toBe("");
    });

    test("placeholder属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select placeholder="Placeholder"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.placeholder).toBe("Placeholder");

      spDropdownSelect.setAttribute("placeholder", "NewPlaceholder");
      expect(spDropdownSelect.placeholder).toBe("NewPlaceholder");
    });
  });

  describe("expanded属性", () => {
    test("expanded属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select expanded="true"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.expanded).toBe(true);
    });

    test("expanded属性を設定しないと、falseが設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select></sp-dropdown-select>
      `;
      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.expanded).toBe(false);
    });

    test("expanded属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select expanded="true"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.expanded).toBe(true);

      spDropdownSelect.setAttribute("expanded", "false");
      expect(spDropdownSelect.expanded).toBe(false);
    });
  });
});
