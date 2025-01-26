import { describe, expect, test } from "vitest";

import {
  DEFAULT_WIDTH,
  SpDropdownSelect,
} from "../../src/components/dropdown/sp-dropdown-select";

function getSpDropdownSelect() {
  return document.querySelector("sp-dropdown-select") as SpDropdownSelect;
}

describe("sp-dropdown-select", () => {
  describe("value属性", () => {
    test("value属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select value="Value"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.value).toBe("Value");
    });

    test("value属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select></sp-dropdown-select>
      `;
      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.value).toBe("");
    });

    test("value属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select value="Value"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.value).toBe("Value");

      spDropdownSelect.setAttribute("value", "NewValue");
      expect(spDropdownSelect.value).toBe("NewValue");
    });
  });

  describe("width属性", () => {
    test("width属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select width="320"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.width).toBe(320);
    });

    test("width属性に数値以外の値を指定すると、DEFAULT_WIDTHが設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select width="hoge"></sp-dropdown-select>
      `;
      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.width).toBe(DEFAULT_WIDTH);
    });

    test("width属性を設定しないと、DEFAULT_WIDTHが設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select></sp-dropdown-select>
      `;
      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.width).toBe(DEFAULT_WIDTH);
    });

    test("width属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-select width="320"></sp-dropdown-select>
      `;

      const spDropdownSelect = getSpDropdownSelect();
      expect(spDropdownSelect.width).toBe(320);

      spDropdownSelect.setAttribute("width", "80");
      expect(spDropdownSelect.width).toBe(80);
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
});
