import "../../src/components/dropdown/sp-dropdown-option";
import "../../src/components/dropdown/sp-dropdown";

import userEvent from "@testing-library/user-event";
import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

import type { SpDropdown } from "../../src/components/dropdown/sp-dropdown";

function getSpDropdown() {
  return document.querySelector("sp-dropdown") as SpDropdown;
}

function getSpDropdownOptions() {
  return document.querySelectorAll("sp-dropdown-option");
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

  describe("value属性", () => {
    test("value属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown value="Value1"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.value).toBe("Value1");
    });
    test("value属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.value).toBe("");
    });
    test("value属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown value="Value1"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.value).toBe("Value1");

      spDropdown.setAttribute("value", "NewValue");
      expect(spDropdown.value).toBe("NewValue");
    });
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

  describe("placeholder属性", () => {
    test("placeholder属性を設定できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown placeholder="Placeholder"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.placeholder).toBe("Placeholder");
    });

    test("placeholder属性を設定しないと、空文字列が設定される", async () => {
      document.body.innerHTML = `
        <sp-dropdown></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.placeholder).toBe("");
    });

    test("placeholder属性を変更できる", async () => {
      document.body.innerHTML = `
        <sp-dropdown placeholder="Placeholder"></sp-dropdown>
      `;

      const spDropdown = getSpDropdown();
      expect(spDropdown.placeholder).toBe("Placeholder");

      spDropdown.setAttribute("placeholder", "NewPlaceholder");
      expect(spDropdown.placeholder).toBe("NewPlaceholder");
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

  describe("キーボード操作", () => {
    test("inputにフォーカスがある状態で、上矢印キーを押すと、選択肢が表示される。また、最後の選択肢がフォーカスされる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const input = getInput();
      input.focus();
      await userEvent.keyboard("{ArrowUp}");

      const listbox = queryListbox();
      expect(listbox).not.toBe(null);
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdownOptions()[1]);
    });

    test("inputにフォーカスがある状態で、下矢印キーを押すと、選択肢が表示される。また、最初の選択肢がフォーカスされる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const input = getInput();
      input.focus();
      await userEvent.keyboard("{ArrowDown}");

      const listbox = queryListbox();
      expect(listbox).not.toBe(null);
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdownOptions()[0]);
    });

    test("選択肢にフォーカスがある状態で、上矢印キーを押すと、前の選択肢がフォーカスされる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;

      const input = getInput();
      input.focus();
      await userEvent.keyboard("{ArrowUp}");
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdownOptions()[1]);

      await userEvent.keyboard("{ArrowUp}");
      const activeElement2 = document.activeElement;
      expect(activeElement2).toBe(getSpDropdownOptions()[0]);
    });

    test("選択肢にフォーカスがある状態で、下矢印キーを押すと、次の選択肢がフォーカスされる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;
      const user = userEvent.setup();

      const input = getInput();
      input.focus();
      await user.keyboard("{ArrowDown}");
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdownOptions()[0]);

      await user.keyboard("{ArrowDown}");
      const activeElement2 = document.activeElement;
      expect(activeElement2).toBe(getSpDropdownOptions()[1]);
    });

    test("inputにフォーカスがある状態で、Enterキーを押すと、選択肢が表示される。また、最初の選択肢がフォーカスされる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
        </sp-dropdown>
      `;
      const user = userEvent.setup();

      const input = getInput();
      input.focus();
      await user.keyboard("{Enter}");

      const listbox = queryListbox();
      expect(listbox).not.toBe(null);
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdownOptions()[0]);
    });

    test("選択肢にフォーカスがある状態で、Enterキーを押すと、その選択肢を選択できる。また、inputにフォーカスが移動する", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;
      const user = userEvent.setup();

      const input = getInput();

      await user.click(input);
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      const listbox = queryListbox();
      expect(listbox).toBe(null);
      expect(getSpDropdown().value).toBe("Value1");
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdown());
    });

    test("inputにフォーカスがある状態で、Spaceキーを押すと、選択肢が表示される。また、最初の選択肢がフォーカスされる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
        </sp-dropdown>
      `;
      const user = userEvent.setup();

      const input = getInput();
      input.focus();
      await user.keyboard(" ");

      const listbox = queryListbox();
      expect(listbox).not.toBe(null);
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdownOptions()[0]);
    });

    test("選択肢にフォーカスがある状態で、Spaceキーを押すと、その選択肢を選択できる。また、inputにフォーカスが移動する", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;
      const user = userEvent.setup();

      const input = getInput();

      await user.click(input);
      await user.keyboard("{ArrowDown}");
      await user.keyboard(" ");

      const listbox = queryListbox();
      expect(listbox).toBe(null);
      expect(getSpDropdown().value).toBe("Value1");
      const activeElement = document.activeElement;
      expect(activeElement).toBe(getSpDropdown());
    });

    test("選択肢にフォーカスがある状態で、Escapeキーを押すと、選択肢が非表示になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown>
          <sp-dropdown-option value="Value1" text="Value1"></sp-dropdown-option>
          <sp-dropdown-option value="Value2" text="Value2"></sp-dropdown-option>
        </sp-dropdown>
      `;
      const user = userEvent.setup();

      const input = getInput();

      await user.click(input);
      await user.keyboard("{Escape}");

      const listbox = queryListbox();
      expect(listbox).toBe(null);
    });
  });
});
