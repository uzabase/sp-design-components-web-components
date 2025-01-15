import "../../src/components/dropdownAction/sp-dropdown-action";

import userEvent from "@testing-library/user-event";
import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

import type { SpDropdownAction } from "../../src/components/dropdownAction/sp-dropdown-action";

function getSpDropdownAction() {
  return document.querySelector("sp-dropdown-action") as SpDropdownAction;
}

function getButton(label: string): HTMLButtonElement {
  return screen.getByShadowRole("button", { name: label });
}

function getMenu() {
  return screen.getByShadowRole("menu");
}

function queryMenu() {
  return screen.queryByShadowRole("menu");
}

function getMenuItems() {
  return screen.getAllByShadowRole("menuitem");
}

describe("sp-dropdown-action", () => {
  describe("label属性", () => {
    test("label属性を設定すると、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成"></sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      expect(button).not.toBeNull();
    });

    test("label属性に空文字を設定すると、ボタンに空文字が表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label=""></sp-dropdown-action>
      `;

      const button = getButton("");
      expect(button).not.toBeNull();
    });

    test("label属性を更新すると、ボタンに更新後の文字列が表示される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成"></sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      await user.click(button);

      const spDropdownAction = getSpDropdownAction();
      spDropdownAction.setAttribute("label", "ダッシュボード編集");

      const newButton = getButton("ダッシュボード編集");
      expect(newButton).not.toBeNull();
    });
  });

  describe("open属性", () => {
    test("open属性にtrueを設定すると、メニューが表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const menu = getMenu();
      expect(menu).not.toBeNull();
    });

    test("open属性に空文字を設定すると、メニューが表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const menu = queryMenu();
      expect(menu).not.toBeNull();
    });

    test("open属性にfalseを設定すると、メニューが非表示になる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="false">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const menu = queryMenu();
      expect(menu).toBeNull();
    });

    test("open属性を更新すると、メニューの表示状態が変わる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      await user.click(button);

      const spDropdownAction = getSpDropdownAction();
      spDropdownAction.setAttribute("open", "false");

      const menu = queryMenu();
      expect(menu).toBeNull();
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、ボタンがdisabledになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" disabled="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      expect(button.disabled).toBe(true);
    });

    test("disabled属性に空文字を設定すると、ボタンがdisabledになる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" disabled="">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      expect(button.disabled).toBe(true);
    });

    test("disabled属性にfalseを設定すると、ボタンがdisabledにならない", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" disabled="false">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      expect(button.disabled).toBe(false);
    });

    test("disabled属性を更新すると、ボタンのdisabled状態が変わる", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" disabled="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const spDropdownAction = getSpDropdownAction();
      spDropdownAction.setAttribute("disabled", "false");

      const button = getButton("ダッシュボード新規作成");
      expect(button.disabled).toBe(false);
    });
  });

  describe("position属性", () => {
    test.each([
      ["left", "position__left"],
      ["right", "position__right"],
    ])(
      "position属性に%sを設定すると、メニューのクラスに%sが設定される",
      async (position, className) => {
        document.body.innerHTML = `
          <sp-dropdown-action label="ダッシュボード新規作成" open="true" position="${position}">
            <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
          </sp-dropdown-action>
        `;

        const menu = getMenu();

        expect(menu.classList.contains(className)).toBe(true);
      },
    );
  });

  describe("メニューの表示", () => {
    test("ボタンをクリックすると、メニューが表示される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      await user.click(button);

      const menu = queryMenu();
      expect(menu).not.toBeNull();
    });

    test("メニューが表示された状態でボタンをクリックすると、メニューが非表示になる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const button = getButton("ダッシュボード新規作成");
      await user.click(button);

      const menu = queryMenu();
      expect(menu).toBeNull();
    });

    test("メニューが表示された状態でメニューの要素をクリックすると、メニューが非表示になる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const menuItems = getMenuItems();
      await user.click(menuItems[0]);

      const menu = queryMenu();
      expect(menu).toBeNull();
    });

    test("メニューが表示された状態でメニューやボタン以外の要素をクリックすると、メニューが非表示になる", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成" open="true">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      await user.click(document.body);

      const menu = queryMenu();
      expect(menu).toBeNull();
    });
  });

  describe("メニュー要素の表示", () => {
    test("sp-dropdown-action-itemを子要素に持つと、メニューにその要素が表示される", async () => {
      document.body.innerHTML = `
        <sp-dropdown-action label="ダッシュボード新規作成">
          <sp-dropdown-action-item>企業を作成</sp-dropdown-action-item>
          <sp-dropdown-action-item>業界を作成</sp-dropdown-action-item>
        </sp-dropdown-action>
      `;

      const menuItems = getMenuItems();

      expect(menuItems.length).toBe(2);
      expect(menuItems[0].textContent).toBe("企業を作成");
      expect(menuItems[1].textContent).toBe("業界を作成");
    });
  });
});
