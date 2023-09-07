// @ts-ignore
import resetStyle from "@acab/reset.css" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle}`);

const render = (x) => `
<label class="base" data-testid="base">
  <input
    type="checkbox"
    ${x.value}
    ${x.name}
    ${x.id}
    ${x.checked && "checked"}
    ${x.indeterminate && "indeterminate"}
    ${x.disabled && "disabled"}
    class="input"
    data-testid="input"
  />
  <span class="checkmark">
    <span class="checkmarkIn" />
  </span>
</label>
`;

export class UbCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }

  connectedCallback() { // connectedCallbackとattributeChangedCallbackの中身まとめた方がいいのか？
    this.shadowRoot!.innerHTML = render(this);
    this.shadowRoot!.querySelector("input").addEventListener("change", (e) => {
      this.handleOnChange(e);
    });
  }

  attributeChangedCallback() {
    this.shadowRoot!.innerHTML = render(this);
    this.shadowRoot!.querySelector("input").addEventListener("change", (e) => {
      this.handleOnChange(e);
    });
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set value(value) {
    this.setAttribute("value", value);
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  set name(value) {
    this.setAttribute("name", value);
  }

  get id() {
    return this.getAttribute("id") || "";
  }

  set id(value) {
    this.setAttribute("id", value);
  }

  get checked() {
    return this.getAttribute("checked") === "true";
  }

  set checked(value) {
    this.setAttribute("checked", value + "");
  }

  get indeterminate() {
    return this.getAttribute("indeterminate") === "true";
  }

  set indeterminate(value) {
    this.setAttribute("indeterminate", value + "");
  }

  get disabled() {
    return this.getAttribute("disabled") === "true";
  }

  set disabled(value) {
    this.setAttribute("disabled", value + "");
  }

  static get observedAttributes() {
    return ["value", "name", "id", "checked", "indeterminate", "disabled"];
  }

  handleOnChange(e) {
    const { checked, indeterminate } = e.currentTarget;
    this.checked = checked;
    this.indeterminate = indeterminate;
    this.dispatchEvent(
      new CustomEvent("change", { // CustomEventらしい名前にしたほうがよいのか？
        bubbles: true,
        composed: true,
        detail: {
          checked,
          indeterminate,
        },
      }),
    );
  }
}

customElements.get("ub-checkbox") ||
  customElements.define("ub-checkbox", UbCheckbox);
