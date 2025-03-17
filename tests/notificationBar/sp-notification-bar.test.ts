import userEvent from "@testing-library/user-event";
import { screen } from "shadow-dom-testing-library";
import { describe, expect, test, vi } from "vitest";

import {
  iconPaths,
  SpNotificationBar,
  Type,
} from "../../src/components/notificationBar/sp-notification-bar";

type IconLabel = "エラー" | "警告" | "情報" | "成功";

function getSpNotificationBar() {
  return document.querySelector("sp-notification-bar") as SpNotificationBar;
}

function getIconByLabel(label: IconLabel) {
  return screen.getByShadowLabelText(label);
}

function getCloseButton() {
  return screen.getByShadowRole("button");
}

function queryContentByText(text: string) {
  return screen.queryByShadowText(text);
}

describe("sp-notification-bar", () => {
  describe("type属性", () => {
    test.each<[Type, IconLabel]>([
      ["error", "エラー"],
      ["warning", "警告"],
      ["information", "情報"],
      ["success", "成功"],
    ])(
      "type属性に%sを設定すると、その値に対応するアイコンが表示される",
      async (type, label) => {
        document.body.innerHTML = `<sp-notification-bar type='${type}'></sp-notification-bar>`;

        const icon = getIconByLabel(label);

        expect(icon.innerHTML).toBe(iconPaths[type]);
      },
    );

    test("type属性を設定しない場合、デフォルトのインフォメーションアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-notification-bar></sp-notification-bar>`;

      const icon = getIconByLabel("情報");

      expect(icon.innerHTML).toBe(iconPaths["information"]);
    });

    test("type属性を更新すると、新しいアイコンが設定される", async () => {
      document.body.innerHTML = `<sp-notification-bar type='information'></sp-notification-bar>`;

      const spNotificationBar = getSpNotificationBar();
      const icon = getIconByLabel("情報");

      spNotificationBar.setAttribute("type", "error");

      expect(icon.innerHTML).toBe(iconPaths["error"]);
    });

    test("無効なtype属性を設定すると、デフォルトのインフォメーションアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-notification-bar type='invalid'></sp-notification-bar>`;

      const icon = getIconByLabel("情報");

      expect(icon.innerHTML).toBe(iconPaths["information"]);
    });
  });

  describe("子要素の表示", () => {
    test("子要素を持つと、その内容が表示される", async () => {
      document.body.innerHTML = `
        <sp-notification-bar>
          Hello, World!
        </sp-notification-bar>
      `;

      const content = queryContentByText("Hello, World!");

      expect(content).not.toBeNull();
    });
  });

  describe("closeイベント", () => {
    test("閉じるボタンをクリックすると、closeイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML = `<sp-notification-bar></sp-notification-bar>`;

      const spNotificationBar = getSpNotificationBar();
      const closeButton = getCloseButton();

      const onClose = vi.fn();
      spNotificationBar.addEventListener("close", onClose);

      await user.click(closeButton);

      expect(onClose).toHaveBeenCalled();
    });
  });
});
