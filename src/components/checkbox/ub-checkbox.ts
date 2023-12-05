// @ts-ignore
import resetStyle from "@acab/reset.css" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(resetStyle);

const render = (x) => `
<label data-testid="base">
  <span class="checkmarkBase">
    <input
      type="checkbox"
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
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = render(this);
    this.input = this.shadowRoot.querySelector("input");
    this.input.addEventListener("change", (e) => {
      this.handleOnChange(e);
    });
    this.temp()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.temp()
  }


  temp() {
    if(!this.input) return
    this.input.setAttribute("value", this.getAttribute("value") || "");
    this.input.setAttribute("name", this.getAttribute("name") || "");
    this.input.checked = this.getAttribute("checked") === "true";
    this.input.indeterminate = this.getAttribute("indeterminate") === "true";
    this.input.disabled = this.getAttribute("disabled") === "true";
    console.log(this.getAttribute("checked"))
  }

  get value() {
    return this.input?.getAttribute("value");
  }

  set value(value) {
    // this.setAttribute("value", value)
    this.input?.setAttribute("value", value);
  }

  get name() {
    return this.input?.getAttribute("name");
  }

  set name(value) {
    this.input?.setAttribute("name", value);
  }
  //
  // get id() {
  //   return this.getAttribute("id") || "";
  // }
  //
  // set id(value) {
  //   this.setAttribute("id", value);
  // }

  get checked() {
    return this.input?.checked || false
    // return this.getAttribute("checked") === "true";
  }

  set checked(value) {
    if(!this.input) return
    this.input.checked = value
    // this.setAttribute("checked", value + "");
  }

  get indeterminate() {
    return this.input?.indeterminate || false
    // return this.getAttribute("indeterminate") === "true";
  }

  set indeterminate(value) {
    if(!this.input) return
    this.input.indeterminate = value
    // this.setAttribute("indeterminate", value + "");
  }

  get disabled() {
    return this.input?.disabled || false
    // return this.getAttribute("disabled") === "true";
  }

  set disabled(value) {
    if(!this.input) return
    this.input.disabled = value
    // this.setAttribute("disabled", value + "");
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
