// @ts-ignore
import resetStyle from "@acab/reset.css" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(resetStyle);

const render = (x) => `
<label data-testid="base">
  <span class="checkmarkBase">
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
      <span class="checkmarkIn"></span>
    </span>
  </span>
</label>
`;

export class UbCheckbox extends HTMLElement {
  internals: ElementInternals;
  static formAssociated = true;
  input: HTMLInputElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
    shadowRoot.innerHTML = render(this);
    this.input = this.shadowRoot.querySelector("input");
    this.input.addEventListener("change", (e) => {
      this.handleOnChange(e);
    });
  }
  connectedCallback() {}

  attributeChangedCallback() {
    this.input.setAttribute("value", this.value || "");
    this.input.setAttribute("name", this.name || "");
    this.input.setAttribute("id", this.id || "");
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.input.disabled = this.disabled;
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
    // this.checked = checked;
    // this.indeterminate = indeterminate;
    this.dispatchEvent(
      new CustomEvent("change", {
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
