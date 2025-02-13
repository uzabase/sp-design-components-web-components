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

describe("sp-pagination", () => {
  describe("total属性", () => {
    test("total属性に正の整数を設定すると、1からtotalまでのページボタンが表示される", async () => {
      document.body.innerHTML = "<sp-pagination total='5'></sp-pagination>";

      const pageButtons = getPageButtons();
      const pageNumbers = pageButtons.map((button) => button.textContent);

      expect(pageButtons).toHaveLength(5);
      expect(pageNumbers).toEqual(["1", "2", "3", "4", "5"]);
    });

    test("total属性を更新すると、更新後のページボタンが表示される", async () => {
      document.body.innerHTML = "<sp-pagination total='5'></sp-pagination>";

      const pagination = getSpPagination();
      pagination.setAttribute("total", "3");

      const pageButtons = getPageButtons();
      const pageNumbers = pageButtons.map((button) => button.textContent);

      expect(pageButtons).toHaveLength(3);
      expect(pageNumbers).toEqual(["1", "2", "3"]);
    });

    test("total属性に0以下の値を設定すると、1ページ目のボタンのみが表示される", async () => {
      document.body.innerHTML = "<sp-pagination total='-1'></sp-pagination>";

      const pageButtons = getPageButtons();
      const pageNumbers = pageButtons.map((button) => button.textContent);

      expect(pageButtons).toHaveLength(1);
      expect(pageNumbers).toEqual(["1"]);
    });

    test("total属性を設定しない場合、1ページ目のボタンのみが表示される", async () => {
      document.body.innerHTML = "<sp-pagination></sp-pagination>";

      const pageButtons = getPageButtons();
      const pageNumbers = pageButtons.map((button) => button.textContent);

      expect(pageButtons).toHaveLength(1);
      expect(pageNumbers).toEqual(["1"]);
    });
  });

  describe("selected属性", () => {
    test("selected属性に合計ページ数以内の正の整数を設定すると、そのページのボタンが選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='2'></sp-pagination>";

      const pageButtons = getPageButtons();
      const hasSelectedClasses = pageButtons.map((button) =>
        button.classList.contains("selected"),
      );
      const ariaCurrentAttributes = pageButtons.map((pageButton) =>
        pageButton.getAttribute("aria-current"),
      );

      expect(hasSelectedClasses).toEqual([false, true, false]);
      expect(ariaCurrentAttributes).toEqual([null, "page", null]);
    });

    test("selected属性に0以下の値を設定すると、1ページ目が選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='0'></sp-pagination>";

      const pageButtons = getPageButtons();
      const hasSelectedClasses = pageButtons.map((button) =>
        button.classList.contains("selected"),
      );
      const ariaCurrentAttributes = pageButtons.map((pageButton) =>
        pageButton.getAttribute("aria-current"),
      );

      expect(hasSelectedClasses).toEqual([true, false, false]);
      expect(ariaCurrentAttributes).toEqual(["page", null, null]);
    });

    test("selected属性に合計ページ数より大きい値を設定すると、1ページ目が選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='4'></sp-pagination>";

      const pageButtons = getPageButtons();
      const hasSelectedClasses = pageButtons.map((button) =>
        button.classList.contains("selected"),
      );
      const ariaCurrentAttributes = pageButtons.map((pageButton) =>
        pageButton.getAttribute("aria-current"),
      );

      expect(hasSelectedClasses).toEqual([true, false, false]);
      expect(ariaCurrentAttributes).toEqual(["page", null, null]);
    });

    test("selected属性を更新すると、更新後のページが選択される", async () => {
      document.body.innerHTML =
        "<sp-pagination total='3' selected='1'></sp-pagination>";

      const pagination = getSpPagination();
      pagination.setAttribute("selected", "3");

      const pageButtons = getPageButtons();
      const hasSelectedClasses = pageButtons.map((button) =>
        button.classList.contains("selected"),
      );
      const ariaCurrentAttributes = pageButtons.map((pageButton) =>
        pageButton.getAttribute("aria-current"),
      );

      expect(hasSelectedClasses).toEqual([false, false, true]);
      expect(ariaCurrentAttributes).toEqual([null, null, "page"]);
    });

    test("selected属性を設定しない場合、1ページ目が選択される", async () => {
      document.body.innerHTML = "<sp-pagination total='3'></sp-pagination>";

      const pageButtons = getPageButtons();
      const hasSelectedClasses = pageButtons.map((button) =>
        button.classList.contains("selected"),
      );
      const ariaCurrentAttributes = pageButtons.map((pageButton) =>
        pageButton.getAttribute("aria-current"),
      );

      expect(hasSelectedClasses).toEqual([true, false, false]);
      expect(ariaCurrentAttributes).toEqual(["page", null, null]);
    });
  });

  describe("ページボタン", () => {
    test("ページボタンをクリックすると、そのページが選択される", async () => {
      const user = userEvent.setup();

      document.body.innerHTML =
        "<sp-pagination total='3' selected='1'></sp-pagination>";

      const secondPageButton = getPageButton(2);
      await user.click(secondPageButton);

      const pageButtons = getPageButtons();
      const hasSelectedClasses = pageButtons.map((button) =>
        button.classList.contains("selected"),
      );
      const ariaCurrentAttributes = pageButtons.map((pageButton) =>
        pageButton.getAttribute("aria-current"),
      );

      expect(hasSelectedClasses).toEqual([false, true, false]);
      expect(ariaCurrentAttributes).toEqual([null, "page", null]);
    });

    describe("一度に表示されるページボタンの仕様", () => {
      test("ページ数が十分にある場合は、現在のページを中心に、左に4つ、右に5つのページボタンが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='20' selected='10'></sp-pagination>";

        const pageButtons = getPageButtons();
        const pageNumbers = pageButtons.map((button) => button.textContent);

        expect(pageButtons).toHaveLength(10);
        expect(pageNumbers).toEqual([
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
        ]);
      });

      test("現在のページが先頭に近い場合は、、最初の10ページが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='20' selected='3'></sp-pagination>";

        const pageNumbers = getPageButtons().map(
          (button) => button.textContent,
        );

        expect(pageNumbers).toEqual([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ]);
      });

      test("現在のページが末尾に近い場合は、最後の10ページが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='20' selected='18'></sp-pagination>";

        const pageNumbers = getPageButtons().map(
          (button) => button.textContent,
        );

        expect(pageNumbers).toEqual([
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
        ]);
      });

      test("表示可能なページが10個未満の場合は、全てのページボタンが表示される", async () => {
        document.body.innerHTML =
          "<sp-pagination total='7' selected='4'></sp-pagination>";

        const pageButtons = getPageButtons();
        const pageNumbers = pageButtons.map((button) => button.textContent);

        expect(pageButtons).toHaveLength(7);
        expect(pageNumbers).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
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

        const pageButtons = getPageButtons();
        const hasSelectedClasses = pageButtons.map((button) =>
          button.classList.contains("selected"),
        );
        const ariaCurrentAttributes = pageButtons.map((pageButton) =>
          pageButton.getAttribute("aria-current"),
        );

        expect(hasSelectedClasses).toEqual([true, false, false]);
        expect(ariaCurrentAttributes).toEqual(["page", null, null]);
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

        const pageButtons = getPageButtons();
        const hasSelectedClasses = pageButtons.map((button) =>
          button.classList.contains("selected"),
        );
        const ariaCurrentAttributes = pageButtons.map((pageButton) =>
          pageButton.getAttribute("aria-current"),
        );

        expect(hasSelectedClasses).toEqual([false, true, false]);
        expect(ariaCurrentAttributes).toEqual([null, "page", null]);
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

        const pageButtons = getPageButtons();
        const hasSelectedClasses = pageButtons.map((button) =>
          button.classList.contains("selected"),
        );
        const ariaCurrentAttributes = pageButtons.map((pageButton) =>
          pageButton.getAttribute("aria-current"),
        );

        expect(hasSelectedClasses).toEqual([false, true, false]);
        expect(ariaCurrentAttributes).toEqual([null, "page", null]);
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

        const pageButtons = getPageButtons();
        const hasSelectedClasses = pageButtons.map((button) =>
          button.classList.contains("selected"),
        );
        const ariaCurrentAttributes = pageButtons.map((pageButton) =>
          pageButton.getAttribute("aria-current"),
        );

        expect(hasSelectedClasses).toEqual([false, false, true]);
        expect(ariaCurrentAttributes).toEqual([null, null, "page"]);
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
      document.body.innerHTML =
        "<sp-pagination total='5' selected='1'></sp-pagination>";
      const pagination = getSpPagination();

      let emittedPage: number | null = null;
      pagination.addEventListener("change", ((e: CustomEvent) => {
        emittedPage = e.detail.page;
      }) as EventListener);

      const pageButtons = getPageButtons();
      pageButtons[1].click(); // 2ページ目をクリック

      expect(emittedPage).toBe(2);
    });

    test("同じページを選択した場合、changeイベントは発火しない", async () => {
      document.body.innerHTML =
        "<sp-pagination total='5' selected='2'></sp-pagination>";
      const pagination = getSpPagination();

      let eventFired = false;
      pagination.addEventListener("change", () => {
        eventFired = true;
      });

      const pageButtons = getPageButtons();
      const currentPageButton = pageButtons.find(
        (button) => button.getAttribute("aria-current") === "page",
      );
      currentPageButton?.click();

      expect(eventFired).toBe(false);
    });

    test("ナビゲーションボタンをクリックしても、changeイベントが発火する", async () => {
      document.body.innerHTML =
        "<sp-pagination total='5' selected='2'></sp-pagination>";
      const pagination = getSpPagination();

      const emittedPages: number[] = [];
      pagination.addEventListener("change", ((e: CustomEvent) => {
        emittedPages.push(e.detail.page);
      }) as EventListener);

      const nextButton = screen.getByShadowText("次へ");
      nextButton.click();

      expect(emittedPages).toEqual([3]);
    });
  });
});
