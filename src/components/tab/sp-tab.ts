import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import { SpIcon } from "../icon/sp-icon";
import tabStyle from "./tab.css?inline";

type TabType = "white" | "gray";
const types: TabType[] = ["white", "gray"];
function isValidTabType(value: string | null): value is TabType {
  return value !== null && types.some((type) => type === value);
}

function isBooleanAttribute(value: string | null): boolean {
  return value === "true" || value === "";
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabStyle} ${resetStyle}`);

export class SpTab extends HTMLElement {
  #disabled!: boolean;
  #plusIconElement = new SpIcon();
  #tabElement = document.createElement("span");
  #textElement = document.createElement("span");
  #textSlotElement = document.createElement("slot");
  #handleClickBound = this.#handleClick.bind(this);
  #textObserver: MutationObserver | null = null;

  get disabled() {
    return this.#disabled;
  }

  set disabled(value: boolean) {
    this.#disabled = value;
    if (value) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("tabindex", "-1");
      if (!this.hasAttribute("disabled")) {
        this.setAttribute("disabled", "");
      }
      this.#updateAriaLabel();
    } else {
      this.setAttribute("aria-disabled", "false");
      this.setAttribute("tabindex", "0");
      this.removeAttribute("disabled");
      this.#updateAriaLabel();
    }
  }

  set selected(value: boolean) {
    if (value) {
      this.setAttribute("selected", "");
      this.setAttribute("aria-selected", "true");
    } else {
      this.removeAttribute("selected");
      this.setAttribute("aria-selected", "false");
    }
  }

  set fill(value: TabType) {
    // 現在の値と同じ場合は何もしない（不要なDOM操作を避ける）
    if (this.getAttribute("fill") === value) return;

    // 既存のfill属性を削除してから新しい値を設定
    this.removeAttribute("fill");
    this.setAttribute("fill", value);
  }

  set plusIcon(value: boolean) {
    if (value) {
      this.#plusIconElement.classList.add("-show");
    } else {
      this.#plusIconElement.classList.remove("-show");
    }
  }

  static get observedAttributes() {
    return ["selected", "plus-icon", "disabled", "fill"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [styles];

    // プロパティの初期化
    this.#disabled = false;
    this.fill = "gray";
  }

  connectedCallback() {
    this.#tabElement.classList.add("spds__tabInner");
    this.#textElement.classList.add("spds__tabText");
    this.#textElement.appendChild(this.#textSlotElement);

    this.#plusIconElement.classList.add("spds__tabIcon");
    this.#plusIconElement.size = "small";
    this.#plusIconElement.type = "plus";
    this.setAttribute("role", "tab");
    this.setAttribute("aria-selected", "false");

    // disabled属性の初期値を確認して適切に設定
    const isDisabled = this.hasAttribute("disabled");
    this.setAttribute("aria-disabled", isDisabled ? "true" : "false");
    // tabindex の初期設定
    this.setAttribute("tabindex", isDisabled ? "-1" : "0");

    // sp-tab要素自体にクリックイベントリスナーを追加
    this.addEventListener("click", this.#handleClickBound);

    // テキストコンテンツの変更を監視してaria-labelを更新
    this.#textObserver = new MutationObserver(() => {
      this.#updateAriaLabel();
    });
    this.#textObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.#plusIconElement.setAttribute("aria-hidden", "true");
    this.#tabElement.appendChild(this.#plusIconElement);
    this.#tabElement.appendChild(this.#textElement);
    this.shadowRoot!.appendChild(this.#tabElement);

    // 初期のaria-labelを設定
    this.#updateAriaLabel();
  }

  disconnectedCallback() {
    // イベントリスナーをクリーンアップ
    this.removeEventListener("click", this.#handleClickBound);

    // MutationObserverをクリーンアップ
    if (this.#textObserver) {
      this.#textObserver.disconnect();
      this.#textObserver = null;
    }
  }

  #handleClick(originalEvent: MouseEvent) {
    // disabledの場合はイベントを無効化
    if (this.#disabled) {
      originalEvent.preventDefault();
      originalEvent.stopPropagation();
      return;
    }

    // イベントはそのまま親に伝播される（sp-tab-groupで処理される）
  }

  #updateAriaLabel() {
    const textContent = this.textContent?.trim() || "";

    if (this.#disabled && textContent) {
      // disabledタブの場合は「ラベル名 + 無効」として読み上げられるように設定
      this.setAttribute("aria-label", `${textContent} 無効`);
    } else {
      // 有効なタブの場合はaria-labelを削除（textContentが自然に読み上げられる）
      this.removeAttribute("aria-label");
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "selected":
        this.selected = isBooleanAttribute(newValue);
        break;
      case "disabled":
        this.disabled = isBooleanAttribute(newValue);
        break;
      case "fill":
        if (isValidTabType(newValue)) {
          this.fill = newValue;
        } else {
          // null値は正常な初期状態なので、無効な文字列値のみ警告
          if (newValue !== null) {
            console.warn(
              `'${newValue}' は無効なfill属性です。有効な値: ${types.join(", ")}`,
            );
          }
          this.fill = "gray";
        }
        break;
      case "plus-icon":
        this.plusIcon = isBooleanAttribute(newValue);
        break;
    }
  }
}

if (!customElements.get("sp-tab")) {
  customElements.define("sp-tab", SpTab);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tab": SpTab;
  }
}
