import { describe, expect, test } from "vitest";
import { screen } from "shadow-dom-testing-library";
import {
  iconPaths,
  SpNotificationMessage,
  Type,
} from "../../src/components/notificationMessage/sp-notification-message";
import "../../src/components/notificationMessage/sp-notification-message";

function getSpNotificationMessage() {
  return document.querySelector(
    "sp-notification-message",
  ) as SpNotificationMessage;
}

function getIcon() {
  return screen.getByShadowRole("img", { hidden: true });
}

function queryContentByText(text: string) {
  return screen.queryByShadowText(text);
}

describe("sp-notification-message", () => {
  describe("type属性", () => {
    test.each<[Type]>([["error"], ["warning"], ["information"], ["success"]])(
      "type属性に%sを設定すると、その値に対応するアイコンが表示される",
      async (type) => {
        document.body.innerHTML = `<sp-notification-message type='${type}'></sp-notification-message>`;

        const icon = getIcon();

        expect(icon.innerHTML).toBe(iconPaths[type]);
      },
    );

    test("type属性を設定しない場合、デフォルトのインフォメーションアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-notification-message></sp-notification-message>`;

      const icon = getIcon();

      expect(icon.innerHTML).toBe(iconPaths["information"]);
    });

    test("type属性を更新すると、新しいアイコンが設定される", async () => {
      document.body.innerHTML = `<sp-notification-message type='information'></sp-notification-message>`;

      const spNotificationMessage = getSpNotificationMessage();
      const icon = getIcon();

      spNotificationMessage.setAttribute("type", "error");

      expect(icon.innerHTML).toBe(iconPaths["error"]);
    });

    test("無効なtype属性を設定すると、デフォルトのインフォメーションアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-notification-message type='invalid'></sp-notification-message>`;

      const icon = getIcon();

      expect(icon.innerHTML).toBe(iconPaths["information"]);
    });
  });

  describe("子要素の表示", () => {
    test("子要素を持つと、その内容が表示される", async () => {
      document.body.innerHTML = `
        <sp-notification-message>
          Hello, World!
        </sp-notification-message>
      `;

      const content = queryContentByText("Hello, World!");

      expect(content).not.toBeNull();
    });
  });
});
