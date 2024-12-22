import { describe, expect, test } from "vitest";
import { screen } from "shadow-dom-testing-library";
import {
  iconPaths,
  SpNotificationMessage,
  Variant,
} from "../../src/components/notificationMessage/sp-notification-message";
import "../../src/components/notificationMessage/sp-notification-message";

function getSpNotificationMessage() {
  return document.querySelector(
    "sp-notification-message",
  ) as SpNotificationMessage;
}

function getIcon() {
  return screen.getByShadowRole("img");
}

function queryContentByText(text: string) {
  return screen.queryByShadowText(text);
}

describe("sp-notification-message", () => {
  describe("variant属性", () => {
    test.each<[Variant]>([["error"], ["warning"], ["info"], ["success"]])(
      "variant属性に%sを設定すると、その値に対応するアイコンが表示される",
      async (variant) => {
        document.body.innerHTML = `<sp-notification-message variant='${variant}'></sp-notification-message>`;

        const icon = getIcon();

        expect(icon.innerHTML).toBe(iconPaths[variant]);
      },
    );

    test("variant属性を設定しない場合、デフォルトのインフォメーションアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-notification-message></sp-notification-message>`;

      const icon = getIcon();

      expect(icon.innerHTML).toBe(iconPaths["info"]);
    });

    test("variant属性を更新すると、新しいアイコンが設定される", async () => {
      document.body.innerHTML = `<sp-notification-message variant='info'></sp-notification-message>`;

      const spNotificationMessage = getSpNotificationMessage();
      const icon = getIcon();

      spNotificationMessage.setAttribute("variant", "error");

      expect(icon.innerHTML).toBe(iconPaths["error"]);
    });

    test("無効なvariant属性を設定すると、デフォルトのインフォメーションアイコンが表示される", async () => {
      document.body.innerHTML = `<sp-notification-message variant='invalid'></sp-notification-message>`;

      const icon = getIcon();

      expect(icon.innerHTML).toBe(iconPaths["info"]);
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
