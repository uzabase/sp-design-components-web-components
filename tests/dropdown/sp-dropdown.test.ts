import { describe, expect, test } from "vitest";
import { screen } from "shadow-dom-testing-library";
import { SpDropdown } from "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown";
import "../../src/components/dropdown/sp-dropdown-option";
import userEvent from "@testing-library/user-event";

function getSpDropdown() {
  return document.querySelector("sp-dropdown") as SpDropdown;
}

function getInput() {
  return screen.getByShadowRole("textbox");
}

function getOption(text: string) {
  return screen.getByShadowRole("option", { name: text });
}

function queryListbox() {
  return screen.queryByShadowRole("listbox");
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

  describe("value属性", () => {
    test("optionを選択すると、valueが変更される", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const user = userEvent.setup();

      const input = getInput();
      await user.click(input);

      const option = getOption("Value1");
      await user.click(option);
      expect(getSpDropdown().value).toBe("Value1");
    });
  });

  describe("選択肢の表示", () => {
    test("inputをクリックすると、選択肢が表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const user = userEvent.setup();

      const input = getInput();
      await user.click(input);

      const listbox = queryListbox();
      expect(listbox).not.toBe(null);
    });

    test("選択肢をクリックすると、選択肢が非表示になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const user = userEvent.setup();

      const input = getInput();
      await user.click(input);

      const option = getOption("Value1");
      await user.click(option);

      const listbox = queryListbox();
      expect(listbox).toBe(null);
    });

    test("選択肢の外側をクリックすると、選択肢が非表示になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const user = userEvent.setup();

      const input = getInput();
      await user.click(input);

      await user.click(document.body);

      const listbox = queryListbox();
      expect(listbox).toBe(null);
    });
  });
});
