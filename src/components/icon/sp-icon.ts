//geterとseterがよくわからない

import { speedaIcons } from "./icons.js";
import iconStyle from "./sp-icon.css" assert { type: "css" };

type Color = "black" | "white" | null;
type Size = "small" | "medium" | "large" | null;

const styles = new CSSStyleSheet();
styles.replaceSync(`${iconStyle}`);

const template = (t) => `
  <svg aria-label="${t.label}" role="img" class="${t.allStyles()}" viewBox="0 0 25 25">
      <title>${t.label}</title>
      <path d="${speedaIcons[t.type]}"/>
    </svg>
`;

export class SpIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }

  get size() {
    return this.getAttribute("size") as Size;
  }
  set size(value) {
    this.setAttribute("size", value);
  }
  get color() {
    return this.getAttribute("color") as Color;
  }
  set color(value) {
    this.setAttribute("color", value);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(value) {
    this.setAttribute("type", value);
  }

  get label() {
    return this.getAttribute("label");
  }
  set label(value) {
    this.setAttribute("label", value);
  }

  allStyles = () => {
    const styles = ["spdsIcon"];
    switch (this.color) {
      case "black":
        styles.push("color__black");
        break;
      case "white":
        styles.push("color__white");
        break;
      default:
        styles.push("color__black");
        break;
    }
    switch (this.size) {
      case "small":
        styles.push("size__small");
        break;
      case "medium":
        styles.push("size__medium");
        break;
      case "large":
        styles.push("size__large");
        break;
      default:
        styles.push("size__medium");
        break;
    }
    return styles.join(" ");
  };

  connectedCallback() {
    this.shadowRoot.innerHTML = template(this);
  }
}
customElements.define("sp-icon", SpIcon);
