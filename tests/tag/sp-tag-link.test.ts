import "../../src/components/tag/sp-tag-link";

import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

import type { SpTagLink } from "../../src/components/tag/sp-tag-link";

function getSpTagLink() {
  return document.querySelector("sp-tag-link") as SpTagLink;
}

function getLink(): HTMLAnchorElement {
  return screen.getByShadowRole("link") as HTMLAnchorElement;
}

// href属性が設定されていない場合はgetByShadowRoleで取得できないため、そのときに使う関数を作成
function getAnchorElement(): HTMLAnchorElement {
  const tagLink = getSpTagLink();
  return tagLink.shadowRoot!.querySelector("a") as HTMLAnchorElement;
}

describe("sp-tag-link", () => {
  describe("スロット", () => {
    test("スロットに渡されたテキストが正しく表示される", async () => {
      document.body.innerHTML = `<sp-tag-link>Hello, World!</sp-tag-link>`;
      const spTagLink = await getSpTagLink();
      const slot = spTagLink.shadowRoot!.querySelector(
        "slot",
      ) as HTMLSlotElement;
      const [text] = slot.assignedNodes();
      expect(text.textContent).toBe("Hello, World!");
    });
  });

  describe("href属性", () => {
    test("href属性を設定すると、a要素にhref属性が設定される", () => {
      document.body.innerHTML = `<sp-tag-link href="https://example.com">Hello, World!</sp-tag-link>`;
      const link = getLink();
      expect(link.getAttribute("href")).toBe("https://example.com");
    });

    test("href属性を更新すると、a要素のhref属性も更新される", () => {
      document.body.innerHTML = `<sp-tag-link href="https://example.com">Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      tagLink.setAttribute("href", "https://updated-example.com");
      const link = getLink();
      expect(link.getAttribute("href")).toBe("https://updated-example.com");
    });

    test("href属性を設定しない場合、a要素にhref属性は設定されない", () => {
      document.body.innerHTML = `<sp-tag-link>Hello, World!</sp-tag-link>`;
      const link = getAnchorElement();
      expect(link.hasAttribute("href")).toBe(false);
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、aria-disabled属性がtrueに設定される", async () => {
      document.body.innerHTML = `<sp-tag-link disabled="true">Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("aria-disabled")).toBe("true");
    });

    test("disabled属性に空文字列を設定すると、aria-disabled属性がtrueに設定される", async () => {
      document.body.innerHTML = `<sp-tag-link disabled>Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("aria-disabled")).toBe("true");
    });

    test("disabled属性にfalseを設定すると、aria-disabled属性は設定されない", async () => {
      document.body.innerHTML = `<sp-tag-link disabled="false">Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("aria-disabled")).toBe(null);
    });

    test("disabled属性を設定しない場合、aria-disabled属性は設定されない", async () => {
      document.body.innerHTML = `<sp-tag-link>Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("aria-disabled")).toBe(null);
    });

    test("disabled属性にtrueを設定すると、tabindex属性が-1に設定される", async () => {
      document.body.innerHTML = `<sp-tag-link disabled="true">Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("tabindex")).toBe("-1");
    });

    test("disabled属性に空文字列を設定すると、tabindex属性が-1に設定される", async () => {
      document.body.innerHTML = `<sp-tag-link disabled>Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("tabindex")).toBe("-1");
    });

    test("disabled属性にfalseを設定すると、tabindex属性は設定されない", async () => {
      document.body.innerHTML = `<sp-tag-link disabled="false">Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("tabindex")).toBe(null);
    });

    test("disabled属性を設定しない場合、tabindex属性は設定されない", async () => {
      document.body.innerHTML = `<sp-tag-link>Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      expect(tagLink.getAttribute("tabindex")).toBe(null);
    });

    test("disabledプロパティを変更すると、aria-disabledとtabindex属性も変更される", async () => {
      document.body.innerHTML = `<sp-tag-link disabled>Hello, World!</sp-tag-link>`;
      const tagLink = getSpTagLink();
      tagLink.disabled = false;
      expect(tagLink.getAttribute("aria-disabled")).toBe(null);
      expect(tagLink.getAttribute("tabindex")).toBe(null);
    });
  });
});
