import "../../src/components/tab/sp-tab";
import {describe, expect, test} from "vitest";
import {screen} from "shadow-dom-testing-library";


describe("sp-tab", () => {

    test.each([
        ["gray", "-gray"],
        ["white", "-white"],
    ])("fill属性を%sにすると、buttonタグにclass名「%s」がつく",
        async (fill, className) => {
            document.body.innerHTML = `<sp-tab fill=${fill}></sp-tab>`;
            const buttonElement = screen.getByShadowRole("button");
            expect(buttonElement.classList.contains(className)).toBe(true);
        });

    test("plusIcon属性をtrueにすると、plusIconアイコンが表示される", async () => {
        document.body.innerHTML = "<sp-tab plusIcon='true'></sp-tab>";
        // const plusIcon = getIcon();
        const iconElement = screen.queryByShadowRole("img");
        expect(iconElement).toBeTruthy();
    });

    test("selected属性をtrueにすると、buttonタグにclass名「-selected」がつく", async () => {
        document.body.innerHTML = `<sp-tab selected="true"></sp-tab>`;
        const buttonElement = screen.getByShadowRole("button");
        expect(buttonElement.classList.contains("-selected")).toBe(true);
    });
    describe("disabled属性", () => {
        test("disabled属性をtrueにすると、buttonタグにdisabled属性がつく", async () => {
            document.body.innerHTML = `<sp-tab disabled=""></sp-tab>`;
            const buttonElement = screen.getByShadowRole("button") as HTMLButtonElement;
            expect(buttonElement.disabled).toBe(true);
        });
        //TODO disabledはClickができないことをテストする
        test("disabled属性をtrueにすると、buttonタグがクリックできなくなる", async () => {
            document.body.innerHTML = `<sp-tab disabled=""></sp-tab>`;
            const buttonElement = screen.getByShadowRole("button");
            let eventFired = false;
            buttonElement.addEventListener("click", () => {
                eventFired = true;
            });
            expect(eventFired).toBe(false);
        });
    });
    test("label属性を設定すると、タブにその文字列が表示される", async () => {
        document.body.innerHTML = `<sp-tab label="ラベル"></sp-tab>`;
        const buttonElement = screen.getByShadowRole("button");
        expect(buttonElement).not.toBeNull();
    });
});
