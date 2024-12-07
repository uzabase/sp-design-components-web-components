import { describe, expect, test } from "vitest";
import { screen, getByShadowTestId } from "shadow-dom-testing-library";
import userEvent from "@testing-library/user-event";
import { SpDropdownDialog } from "../../src/components/dropdownDialog/sp-dropdown-dialog";
import "../../src/components/dropdownDialog/sp-dropdown-dialog";

function getSpDropdownDialog() {
  return document.querySelector("sp-dropdown-dialog") as SpDropdownDialog;
}

function getButton(label: string): HTMLButtonElement {
  return screen.getByShadowRole("button", { name: label });
}

function getDialog() {
  return screen.getByShadowRole("dialog");
}

function queryDialog() {
  return screen.queryByShadowRole("dialog");
}

describe("sp-dropdown-dialog", () => {
  describe("label属性", () => {
    test("label属性を設定すると、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示"></sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      expect(button).not.toBeNull();
    });

    test("label属性に空文字を設定すると、ボタンに空文字が表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label=""></sp-dropdown-dialog>
      `;

      const button = getButton("");
      expect(button).not.toBeNull();
    });

    test("label属性を更新すると、ボタンに更新後の文字列が表示される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示"></sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      await user.click(button);

      const spDropdownAction = getSpDropdownDialog();
      spDropdownAction.setAttribute("label", "ダッシュボード編集");

      const newButton = getButton("ダッシュボード編集");
      expect(newButton).not.toBeNull();
    });
  });

  describe("open属性", () => {
    test("open属性にtrueを設定すると、ダイアログが表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="true">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const dialog = getDialog();
      expect(dialog).not.toBeNull();
    });

    test("open属性に空文字を設定すると、ダイアログが表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const dialog = queryDialog();
      expect(dialog).not.toBeNull();
    });

    test("open属性にfalseを設定すると、ダイアログが非表示になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="false">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const dialog = queryDialog();
      expect(dialog).toBeNull();
    });

    test("open属性を更新すると、ダイアログの表示状態が変わる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="true">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      await user.click(button);

      const spDropdownAction = getSpDropdownDialog();
      spDropdownAction.setAttribute("open", "false");

      const dialog = queryDialog();
      expect(dialog).toBeNull();
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、ボタンがdisabledになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" disabled="true">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      expect(button.disabled).toBe(true);
    });

    test("disabled属性に空文字を設定すると、ボタンがdisabledになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" disabled="">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      expect(button.disabled).toBe(true);
    });

    test("disabled属性にfalseを設定すると、ボタンがdisabledにならない", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" disabled="false">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      expect(button.disabled).toBe(false);
    });

    test("disabled属性を更新すると、ボタンのdisabled状態が変わる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" disabled="true">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const spDropdownAction = getSpDropdownDialog();
      spDropdownAction.setAttribute("disabled", "false");

      const button = getButton("ダイアログを表示");
      expect(button.disabled).toBe(false);
    });
  });

  describe("position属性", () => {
    test.each([
      ["left", "position__left"],
      ["right", "position__right"],
    ])(
      "position属性に%sを設定すると、ダイアログのクラスに%sが設定される",
      async (position, className) => {
        document.body.innerHTML = `
          <sp-dropdown-dialog label="ダイアログを表示" open="true" position="${position}">
            ダイアログの内容
          </sp-dropdown-dialog>
        `;

        const dialog = getDialog();
        expect(dialog.classList.contains(className)).toBe(true);
      },
    );
  });

  describe("ダイアログの表示", () => {
    test("ボタンをクリックすると、ダイアログが表示される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      await user.click(button);

      const dialog = queryDialog();
      expect(dialog).not.toBeNull();
    });

    test("ダイアログが表示された状態でボタンをクリックすると、ダイアログが非表示になる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="true">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      const button = getButton("ダイアログを表示");
      await user.click(button);

      const dialog = queryDialog();
      expect(dialog).toBeNull();
    });

    test("ダイアログが表示された状態でダイアログやボタン以外の要素をクリックすると、ダイアログが非表示になる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="true">
          ダイアログの内容
        </sp-dropdown-dialog>
      `;

      await user.click(document.body);

      const dialog = queryDialog();
      expect(dialog).toBeNull();
    });
  });

  describe("ダイアログの内容の表示", () => {
    test("子要素がダイアログの内容として表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-dialog label="ダイアログを表示" open="true">
          <div data-testid="content">ダイアログの内容</div>
        </sp-dropdown-dialog>
      `;

      const dialog = getDialog();
      const content = getByShadowTestId(dialog, "content");
      expect(content.textContent).toBe("ダイアログの内容");
    });
  });
});
