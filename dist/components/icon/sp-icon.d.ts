import { UbIcon } from "@ub-design/components-web-components/";
type Color = "regular" | "inverse";
export declare class SpIcon extends UbIcon {
    private _color;
    static styles: CSSStyleSheet[];
    paths: {
        home: string;
        company: string;
        arrow_left: string;
        arrow_right: string;
        arrow_down: string;
        arrow_up: string;
        doublearrow_left: string;
        doublearrow_right: string;
        doublearrow_down: string;
        plus: string;
        delete: string;
        download: string;
        edit: string;
        close: string;
        arrow_right_link: string;
        arrow_down_link: string;
        arrow_up_link: string;
        search: string;
        help: string;
        settings: string;
        notification: string;
        person: string;
        my_speeda: string;
        operator: string;
        bookmark: string;
        like: string;
        lock: string;
        opinion: string;
        pib: string;
        calendar: string;
        people: string;
        list: string;
        mail: string;
        zip: string;
        folder: string;
        error: string;
        location: string;
        open_in_new: string;
        menu: string;
        create: string;
        copy: string;
        kebab_menu: string;
        drag: string;
        clear: string;
        toggle_arrow_right: string;
        toggle_arrow_down: string;
        check_bold: string;
        sort: string;
        sort_down: string;
        sort_up: string;
    };
    set color(val: Color);
    get color(): Color;
    svg: SVGElement;
    constructor();
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-icon": SpIcon;
    }
}
export {};
//# sourceMappingURL=sp-icon.d.ts.map