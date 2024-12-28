import { describe, expect, test } from "vitest";
import { SpDropdown } from "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown";

function getSpDropdown() {
  return document.querySelector("sp-dropdown") as SpDropdown;
}

describe("sp-dropdown", () => {
  describe("selectType属性", () => {});

  describe("width属性", () => {
    describe("width属性に許可された値を設定すると、その値になる", async () => {
      const allowedValues = ["liquid", "80", "120", "160", "240", "320"];

      for (const value of allowedValues) {
        test(value, async () => {
          document.body.innerHTML = `
          <sp-dropdown width="${value}"></sp-dropdown>
        `;

          const spDropdown = getSpDropdown();
          expect(spDropdown.width).toBe(value);
        });
      }
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
  });
});
