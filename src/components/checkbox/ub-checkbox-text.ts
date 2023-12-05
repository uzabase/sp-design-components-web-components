// @ts-ignore
import resetStyle from "@acab/reset.css" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(resetStyle);

const render = (x) => `
<label class="base" data-testid="base">
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
  <span class="label" data-testid="label">
    ${x.label}
  </span>
</label>
`;

export class UbCheckboxText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }

  connectedCallback() {
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

  get label() {
    return this.getAttribute("label") || "";
  }

  set label(value) {
    this.setAttribute("label", value);
  }

  static get observedAttributes() {
    return [
      "value",
      "name",
      "id",
      "checked",
      "indeterminate",
      "disabled",
      "label",
    ];
  }

  handleOnChange(e) {
    const { checked, indeterminate } = e.currentTarget;
    this.checked = checked;
    this.indeterminate = indeterminate;
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

customElements.get("ub-checkbox-text") ||
  customElements.define("ub-checkbox-text", UbCheckboxText);
