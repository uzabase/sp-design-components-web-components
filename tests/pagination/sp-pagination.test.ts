import "../../src/components/pagination/sp-pagination";

import userEvent from "@testing-library/user-event";
import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

import type { SpPagination } from "../../src/components/pagination/sp-pagination";

function getSpPagination() {
  return document.querySelector("sp-pagination") as SpPagination;
}

function getPageButtons() {
  return screen
    .getAllByShadowRole("button")
    .filter((button) =>
      button.classList.contains("page"),
    ) as HTMLButtonElement[];
}

function getPageButton(page: number) {
  const name = new RegExp(String(page));
  return screen.getByShadowRole("button", { name }) as HTMLButtonElement;
}

function getCurrentPageButton() {
  const pageButtons = getPageButtons();
  return pageButtons.find((button) =>
    button.classList.contains("selected"),
  ) as HTMLButtonElement;
}

function getFirstPageButton() {
  return screen.getByShadowRole("button", {
    name: "最初へ",
  }) as HTMLButtonElement;
}

function getPreviousPageButton() {
  return screen.getByShadowRole("button", {
    name: "前へ",
  }) as HTMLButtonElement;
}

function getNextPageButton() {
  return screen.getByShadowRole("button", {
    name: "次へ",
  }) as HTMLButtonElement;
}

function getLastPageButton() {
  return screen.getByShadowRole("button", {
    name: "最後へ",
  }) as HTMLButtonElement;
}

function assertVisiblePages(expected: number[]) {
  const pageNumbers = getPageButtons().map((button) => button.textContent);
  expect(pageNumbers).toEqual(expected.map(String));
}

function assertSelectedPage(expected: number) {
  const pageButtons = getPageButtons();
  const index = expected - 1;

  const expectedHasSelectedClasses = Array(pageButtons.length).fill(false);
  expectedHasSelectedClasses[index] = true;

  const expectedAriaCurrentAttributes = Array(pageButtons.length).fill(null);
  expectedAriaCurrentAttributes[index] = "page";

  const actualHasSelectedClasses = pageButtons.map((button) =>
    button.classList.contains("selected"),
  );
  const actualAriaCurrentAttributes = pageButtons.map((button) =>
    button.getAttribute("aria-current"),
  );

  expect(actualHasSelectedClasses).toEqual(expectedHasSelectedClasses);
  expect(actualAriaCurrentAttributes).toEqual(expectedAriaCurrentAttributes);
}

describe("sp-pagination", () => {
  describe("total属性", () => {
    test("total属性に正の整数を設定すると、1からtotalまでのページボタンが表示される", async () => {
      document.body.innerHTML = "<sp-pagination total='3'></sp-pagination>";

      assertVisiblePages([1, 2, 3]);
    });

    test("total属性を更新すると、更新後のページボタンが表示される", async () => {
      document.body.innerHTML = "<sp-pagination total='5'></sp-pagination>";

      const pagination = getSpPagination();
      pagination.setAttribute("total", "3");

      assertVisiblePages([1, 2, 3]);
    });

    test("total属性に0以下の無効な値を設定すると、1ページ目のボタンのみが表示される", async () => {
      document.body.innerHTML = "<sp-pagination total='-1'></sp-pagination>";

      assertVisiblePages([1]);
    });

    test("total属性を設定しない場合、1ページ目のボタンのみが表示される", async () => {
      document.body.innerHTML = "<sp-pagination></sp-pagination>";

      assertVisiblePages([1]);
    });
  });

  describe("selected属性", () => {
    test("selected属性に合計ページ数以内の正の整数を設定すると、そのページのボタンが選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='2'></sp-pagination>";

      assertSelectedPage(2);
    });

    test("selected属性に0以下の無効な値を設定すると、1ページ目が選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='0'></sp-pagination>";

      assertSelectedPage(1);
    });

    test("selected属性に合計ページ数より大きい値を設定すると、1ページ目が選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='4'></sp-pagination>";

      assertSelectedPage(1);
    });

    test("selected属性を更新すると、更新後のページが選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='1'></sp-pagination>";

      const pagination = getSpPagination();
      pagination.setAttribute("selected", "3");

      assertSelectedPage(3);
    });

    test("selected属性を設定しない場合、1ページ目が選択される", async () => {
      document.body.innerHTML = "<sp-pagination total='3'></sp-pagination>";

      assertSelectedPage(1);
    });
  });

  describe("ページボタン", () => {
    test("ページボタンをクリックすると、そのページが選択される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML =
        "<sp-pagination total='3' selected='1'></sp-pagination>";

      const secondPageButton = getPageButton(2);
      await user.click(secondPageButton);

      assertSelectedPage(2);
    });

    describe("一度に表示されるページボタンの仕様", () => {
      test("ページ数が十分にある場合は、現在のページを中心に、左に4つ、右に5つのページボタンが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='20' selected='10'></sp-pagination>";

        assertVisiblePages([6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      });

      test("現在のページが先頭に近い場合は、、最初の10ページが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='20' selected='3'></sp-pagination>";

        assertVisiblePages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

      test("現在のページが末尾に近い場合は、最後の10ページが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='20' selected='18'></sp-pagination>";

        assertVisiblePages([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
      });

      test("表示可能なページが10個未満の場合は、全てのページボタンが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='7' selected='4'></sp-pagination>";

        assertVisiblePages([1, 2, 3, 4, 5, 6, 7]);
      });
    });
  });

  describe("ナビゲーションボタン", () => {
    describe("最初へボタン", () => {
      test("最初へボタンをクリックすると、1ページ目が選択される", async () => {
        const user = userEvent.setup();

        document.body.innerHTML =
          "<sp-pagination total='3' selected='3'></sp-pagination>";

        const firstButton = getFirstPageButton();
        await user.click(firstButton);

        assertSelectedPage(1);
      });

      test("1ページ目を選択中は、最初へボタンが無効化される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='3' selected='1'></sp-pagination>";

        const firstButton = getFirstPageButton();
        expect(firstButton.disabled).toBe(true);
      });
    });

    describe("前へボタン", async () => {
      test("前へボタンをクリックすると、前のページが選択される", async () => {
        const user = userEvent.setup();

        document.body.innerHTML =
          "<sp-pagination total='3' selected='3'></sp-pagination>";

        const prevButton = getPreviousPageButton();
        await user.click(prevButton);

        assertSelectedPage(2);
      });

      test("1ページ目を選択中は、前へボタンが無効化される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='3' selected='1'></sp-pagination>";

        const previousButton = getPreviousPageButton();
        expect(previousButton.disabled).toBe(true);
      });
    });

    describe("次へボタン", async () => {
      test("次へボタンをクリックすると、次のページが選択される", async () => {
        const user = userEvent.setup();

        document.body.innerHTML =
          "<sp-pagination total='3' selected='1'></sp-pagination>";

        const nextButton = getNextPageButton();
        await user.click(nextButton);

        assertSelectedPage(2);
      });

      test("最後のページを選択中は、次へボタンが無効化される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='3' selected='3'></sp-pagination>";

        const nextButton = getNextPageButton();
        expect(nextButton.disabled).toBe(true);
      });
    });

    describe("最後へボタン", async () => {
      test("最後へボタンをクリックすると、最後のページが選択される", async () => {
        const user = userEvent.setup();

        document.body.innerHTML =
          "<sp-pagination total='3' selected='1'></sp-pagination>";

        const lastButton = getLastPageButton();
        await user.click(lastButton);

        assertSelectedPage(3);
      });

      test("最後のページを選択中は、最後へボタンが無効化される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='3' selected='3'></sp-pagination>";

        const lastButton = getLastPageButton();
        expect(lastButton.disabled).toBe(true);
      });
    });
  });

  describe("ページ変更イベント", () => {
    test("ページボタンをクリックすると、changeイベントが発火する", async () => {
      const user = userEvent.setup();

      document.body.innerHTML =
        "<sp-pagination total='5' selected='1'></sp-pagination>";

      const pagination = getSpPagination();

      let emittedPage: number | null = null;
      pagination.addEventListener("change", ((event: CustomEvent) => {
        emittedPage = event.detail.page;
      }) as EventListener);

      const pageButton = getPageButton(2);
      await user.click(pageButton);

      expect(emittedPage).toBe(2);
    });

    test("同じページを選択した場合、changeイベントは発火しない", async () => {
      const user = userEvent.setup();

      document.body.innerHTML =
        "<sp-pagination total='5' selected='2'></sp-pagination>";

      const pagination = getSpPagination();

      let eventFired = false;
      pagination.addEventListener("change", () => {
        eventFired = true;
      });

      const currentPageButton = getCurrentPageButton();
      await user.click(currentPageButton);

      expect(eventFired).toBe(false);
    });

    test("ナビゲーションボタンをクリックしても、changeイベントが発火する", async () => {
      document.body.innerHTML =
        "<sp-pagination total='5' selected='2'></sp-pagination>";

      const pagination = getSpPagination();

      let emittedPage: number | null = null;
      pagination.addEventListener("change", ((event: CustomEvent) => {
        emittedPage = event.detail.page;
      }) as EventListener);

      const nextPageButton = getNextPageButton();
      await userEvent.click(nextPageButton);

      expect(emittedPage).toEqual(3);
    });
  });
});
