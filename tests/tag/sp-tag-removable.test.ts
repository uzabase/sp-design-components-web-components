import "../../src/components/tag/sp-tag-removable";

import userEvent from "@testing-library/user-event";
import { screen } from "shadow-dom-testing-library";
import { describe, expect, test, vi } from "vitest";

import type { SpTagRemovable } from "../../src/components/tag/sp-tag-removable";

function getSpTagRemovable() {
  return document.querySelector("sp-tag-removable") as SpTagRemovable;
}

function getRemoveButton(): HTMLButtonElement {
  return screen.getByShadowLabelText("削除") as HTMLButtonElement;
}

function getDragIcon(): HTMLElement | null {
  return screen.queryByShadowLabelText("ドラッグハンドル");
}

describe("sp-tag-removable", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", async () => {
      document.body.innerHTML = `<sp-tag-removable>Hello, World!</sp-tag-removable>`;

      const spTagRemovable = await getSpTagRemovable();
      const slot = spTagRemovable.shadowRoot!.querySelector(
        "slot",
      ) as HTMLSlotElement;
      const [text] = slot.assignedNodes();
      expect(text.textContent).toBe("Hello, World!");
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、削除ボタンがdisabledになる", async () => {
      document.body.innerHTML = `<sp-tag-removable disabled="true">Hello, World!</sp-tag-removable>`;

      const removeButton = getRemoveButton();
      expect(removeButton.disabled).toBe(true);
    });

    test("disabled属性に空文字列を設定すると、削除ボタンがdisabledになる", async () => {
      document.body.innerHTML = `<sp-tag-removable disabled>Hello, World!</sp-tag-removable>`;

      const removeButton = getRemoveButton();
      expect(removeButton.disabled).toBe(true);
    });

    test("disabled属性にfalseを設定すると、削除ボタンはdisabledにならない", async () => {
      document.body.innerHTML = `<sp-tag-removable disabled="false">Hello, World!</sp-tag-removable>`;

      const removeButton = getRemoveButton();
      expect(removeButton.disabled).toBe(false);
    });

    test("disabled属性を更新すると、削除ボタンのdisabled状態に更新後の値が反映される", async () => {
      document.body.innerHTML = `<sp-tag-removable disabled="true">Hello, World!</sp-tag-removable>`;

      const tagRemovable = getSpTagRemovable();
      const removeButton = getRemoveButton();

      tagRemovable.setAttribute("disabled", "false");
      expect(removeButton.disabled).toBe(false);
    });

    test("disabled属性を設定しない場合、削除ボタンはdisabledにならない", async () => {
      document.body.innerHTML = `<sp-tag-removable>Hello, World!</sp-tag-removable>`;

      const removeButton = getRemoveButton();
      expect(removeButton.disabled).toBe(false);
    });
  });

  describe("draggable属性", () => {
    test("draggable属性を設定しない場合、ドラッグアイコンは表示されない", async () => {
      document.body.innerHTML = `<sp-tag-removable>Hello, World!</sp-tag-removable>`;

      const dragIcon = getDragIcon();
      expect(dragIcon).toBeNull();
    });

    test("draggable属性にtrueを設定すると、ドラッグアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-tag-removable draggable="true">Hello, World!</sp-tag-removable>`;

      const dragIcon = getDragIcon();
      expect(dragIcon).not.toBeNull();
    });

    test("draggable属性に空文字列を設定すると、ドラッグアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-tag-removable draggable>Hello, World!</sp-tag-removable>`;

      const dragIcon = getDragIcon();
      expect(dragIcon).not.toBeNull();
    });

    test("draggable属性にfalseを設定すると、ドラッグアイコンは表示されない", async () => {
      document.body.innerHTML = `<sp-tag-removable draggable="false">Hello, World!</sp-tag-removable>`;

      const dragIcon = getDragIcon();
      expect(dragIcon).toBeNull();
    });

    test("draggable属性を更新すると、ドラッグアイコンの表示状態に更新後の値が反映される", async () => {
      document.body.innerHTML = `<sp-tag-removable>Hello, World!</sp-tag-removable>`;

      const tagRemovable = getSpTagRemovable();

      let dragIcon = getDragIcon();
      expect(dragIcon).toBeNull();

      tagRemovable.setAttribute("draggable", "true");

      await new Promise((resolve) => setTimeout(resolve, 0));

      dragIcon = getDragIcon();
      expect(dragIcon).not.toBeNull();
    });
  });

  describe("削除イベント", () => {
    test("削除ボタンをクリックするとremoveイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();

      const removeHandler = vi.fn();
      tagRemovable.addEventListener("remove", removeHandler);

      const removeButton = getRemoveButton();
      await user.click(removeButton);

      expect(removeHandler).toHaveBeenCalled();
    });

    test("disabled状態の場合、削除ボタンをクリックしてもremoveイベントは発火しない", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable disabled>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();

      const removeHandler = vi.fn();
      tagRemovable.addEventListener("remove", removeHandler);

      const removeButton = getRemoveButton();
      await user.click(removeButton);

      expect(removeHandler).not.toHaveBeenCalled();
    });
  });

  describe("ドラッグ機能", () => {
    test("draggable=trueの場合、ドラッグアイコンのマウスダウンでdragstartイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable draggable>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();

      const dragStartHandler = vi.fn();
      tagRemovable.addEventListener("dragstart", dragStartHandler);

      const dragIcon = getDragIcon();
      await user.pointer([{ target: dragIcon!, keys: "[MouseLeft>]" }]);

      expect(dragStartHandler).toHaveBeenCalled();
    });

    test("disabled状態の場合、ドラッグアイコンのマウスダウンでdragstartイベントは発火しない", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable disabled draggable>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();

      const dragStartHandler = vi.fn();
      tagRemovable.addEventListener("dragstart", dragStartHandler);

      const dragIcon = getDragIcon();
      await user.pointer([{ target: dragIcon!, keys: "[MouseLeft>]" }]);

      expect(dragStartHandler).not.toHaveBeenCalled();
    });

    test("ドラッグ中はdragイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable draggable>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();

      const dragHandler = vi.fn();
      tagRemovable.addEventListener("drag", dragHandler);

      const dragIcon = getDragIcon();

      await user.pointer([
        { target: dragIcon!, keys: "[MouseLeft>]" },
        { target: document.body, coords: { x: 100, y: 100 } },
        { keys: "[/MouseLeft]" },
      ]);

      expect(dragHandler).toHaveBeenCalled();
    });

    test("ドラッグ終了時にdragendイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable draggable>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();

      const dragEndHandler = vi.fn();
      tagRemovable.addEventListener("dragend", dragEndHandler);

      const dragIcon = getDragIcon();

      await user.pointer([
        { target: dragIcon!, keys: "[MouseLeft>]" },
        { target: document.body, coords: { x: 100, y: 100 } },
        { keys: "[/MouseLeft]" },
      ]);

      expect(dragEndHandler).toHaveBeenCalled();
    });

    test("ドラッグ中はクラスにdraggingクラスが追加される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-tag-removable draggable>Hello, World!</sp-tag-removable>`;
      const tagRemovable = getSpTagRemovable();
      const baseElement = tagRemovable.shadowRoot!.querySelector(
        ".base",
      ) as HTMLElement;

      const dragIcon = getDragIcon();

      await user.pointer([{ target: dragIcon!, keys: "[MouseLeft>]" }]);

      expect(baseElement.classList.contains("dragging")).toBe(true);

      await user.pointer([{ keys: "[/MouseLeft]" }]);

      expect(baseElement.classList.contains("dragging")).toBe(false);
    });
  });
});
