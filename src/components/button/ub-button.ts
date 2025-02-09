import resetStyle from "@acab/reset.css?inline";

type ButtonType = "default" | "destructive";
type Appearance = "outline" | "fill" | "text";
type Size = "medium" | "large" | "xLarge" | "width160" | "width80";

const buttonTypes: ButtonType[] = ["default", "destructive"];
const appearances: Appearance[] = ["outline", "fill", "text"];
const sizes: Size[] = ["medium", "large", "xLarge", "width160", "width80"];

function isValidType(value: string): value is ButtonType {
  return buttonTypes.some((type) => type === value);
}

function isValidAppearance(value: string): value is Appearance {
  return appearances.some((appearance) => appearance === value);
}

function isValidSize(value: string): value is Size {
  return sizes.some((size) => size === value);
}

const styles = new CSSStyleSheet();
styles.replaceSync(resetStyle);

export class UbButton extends HTMLElement {
  #loading: boolean = false;
  #selected: boolean = false;
  #disabled: boolean = false;
  #type: ButtonType = "default";
  #appearance: Appearance = "outline";
  #size: Size = "medium";

  buttonElement = document.createElement("button");
  textElement = document.createElement("span");

  get loading() {
    return this.#loading;
  }
  set loading(value: boolean) {
    const button = this.buttonElement;
    this.#loading = value;

    if (value) {
      button.classList.add("isLoading");
    } else {
      button.classList.remove("isLoading");
    }

    this.#buttonDisabledUpdate();
  }

  get selected() {
    return this.#selected;
  }
  set selected(value: boolean) {
    const button = this.buttonElement;
    this.#selected = value;

    if (value) {
      button.classList.add("isSelected");
    } else {
      button.classList.remove("isSelected");
    }
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    const button = this.buttonElement;
    this.#disabled = value;

    if (value) {
      button.classList.add("isDisable");
    } else {
      button.classList.remove("isDisable");
    }

    this.#buttonDisabledUpdate();
  }

  get type() {
    return this.#type;
  }
  set type(value: ButtonType) {
    const button = this.buttonElement;
    const typeClassList = {
      default: "type__default",
      destructive: "type__destructive",
    };
    button.classList.remove(typeClassList[this.#type]);
    button.classList.add(typeClassList[value]);
    this.#type = value;
  }

  get appearance() {
    return this.#appearance;
  }
  set appearance(value: Appearance) {
    const button = this.buttonElement;
    const typeClassList = {
      outline: "appearance__outline",
      fill: "appearance__fill",
      text: "appearance__text",
    };
    button.classList.remove(typeClassList[this.#appearance]);
    button.classList.add(typeClassList[value]);
    this.#appearance = value;
  }

  get size() {
    return this.#size;
  }
  set size(value: Size) {
    const button = this.buttonElement;
    const typeClassList = {
      medium: "size__medium",
      large: "size__large",
      xLarge: "size__xLarge",
      width160: "size__width160",
      width80: "size__width80",
    };
    button.classList.remove(typeClassList[this.#size]);
    button.classList.add(typeClassList[value]);
    this.#size = value;
  }

  static get observedAttributes() {
    return ["loading", "selected", "disabled", "type", "appearance", "size"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.buttonElement.classList.add("base");
    this.textElement.classList.add("base__text");

    this.loading = false;
    this.selected = false;
    this.disabled = false;
    this.type = "default";
    this.appearance = "outline";
    this.size = "medium";
  }

  connectedCallback() {
    const slotElement = document.createElement("slot");
    this.textElement.appendChild(slotElement);
    this.buttonElement.appendChild(this.textElement);
    this.shadowRoot!.appendChild(this.buttonElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "loading":
        this.loading = newValue === "true" || newValue === "";
        break;
      case "selected":
        this.selected = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "type":
        if (isValidType(newValue)) {
          this.type = newValue;
        } else {
          console.warn(`${newValue}は無効なtype属性です。`);
          this.type = "default";
        }
        break;
      case "appearance":
        if (isValidAppearance(newValue)) {
          this.appearance = newValue;
        } else {
          console.warn(`${newValue}は無効なappearance属性です。`);
          this.appearance = "outline";
        }
        break;
      case "size":
        if (isValidSize(newValue)) {
          this.size = newValue;
        } else {
          console.warn(`${newValue}は無効なsize属性です。`);
          this.size = "medium";
        }
        break;
    }
  }

  #buttonDisabledUpdate() {
    this.buttonElement.disabled = this.disabled || this.loading;
  }
}
