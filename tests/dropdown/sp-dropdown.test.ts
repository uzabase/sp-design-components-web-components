import { describe, expect, test } from "vitest";
import { SpDropdown } from "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown";

function getSpDropdown() {
  return document.querySelector("sp-dropdown") as SpDropdown;
}

describe("sp-dropdown", () => {
  describe("selectType属性", () => {
    describe("selectType属性を設定できる", async () => {
      const selectTypes = ["single", "multiple"];

      for (const value of selectTypes) {
        test(value, async () => {
          document.body.innerHTML = `
          <sp-dropdown select-type="${value}"></sp-dropdown>
        `;

          const spDropdown = getSpDropdown();
          expect(spDropdown.selectType).toBe(value);
        });
      }
    });

    test("selectType属性を設定しないと、singleになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.selectType).toBe("single");
    });

    test("selectType属性に不正な値を設定すると、singleになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown select-type="invalid"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.selectType).toBe("single");
    });

    test("selectType属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown select-type="single"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.selectType).toBe("single");

      spDropdown.setAttribute("select-type", "multiple");
      expect(spDropdown.selectType).toBe("multiple");
    });
  });

  describe("width属性", () => {
    describe("width属性を設定できる", async () => {
      const widths = ["liquid", 80, 160, 320];

      for (const value of widths) {
        test(String(value), async () => {
          document.body.innerHTML = `
          <sp-dropdown width="${value}"></sp-dropdown>
        `;

          const spDropdown = getSpDropdown();
          expect(spDropdown.width).toBe(value);
        });
      }
    });

    test("width属性に80より小さい数値を設定すると、80になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown width="40"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.width).toBe(80);
    });

    test("width属性に320より大きい数値を設定すると、320になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown width="400"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.width).toBe(320);
    });

    test("width属性を設定しないと、liquidになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.width).toBe("liquid");
    });

    test("width属性に不正な値を設定すると、liquidになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown width="invalid"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.width).toBe("liquid");
    });

    test("width属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown width="liquid"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.width).toBe("liquid");

      spDropdown.setAttribute("width", "80");
      expect(spDropdown.width).toBe(80);
    });
  });
});
