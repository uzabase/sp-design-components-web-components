import "./sp-tab";
import "./sp-tab-panel";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import type { SpTab } from "./sp-tab";
import tabGroupStyle from "./tab-group.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabGroupStyle} ${resetStyle}`);

export class SpTabGroup extends HTMLElement {
  #navSlot = document.createElement("slot");
  #panelSlot = document.createElement("slot");
  #navWrapper = document.createElement("div");
  #panelWrapper = document.createElement("div");
  #defaultPanel: string | null = null;

  private isValidTabElement(target: EventTarget | null): target is SpTab {
    return (
      target instanceof HTMLElement &&
      target.getAttribute("slot") === "nav" &&
      target.tagName === "SP-TAB" &&
      !target.hasAttribute("disabled")
    );
  }

  private getInitialSelectedTab() {
    const tabs = this.#navSlot
      .assignedElements()
      .filter((e) => this.isValidTabElement(e));

    if (tabs.length === 0) return null;

    if (this.#defaultPanel) {
      const defaultTab = tabs.find(
        (tab) => tab.getAttribute("panel") === this.#defaultPanel,
      );
      if (defaultTab) {
        return defaultTab;
      }
    }

    // デフォルトパネルが見つからない場合、または指定されていない場合は最初のタブを返す
    return tabs[0];
  }

  private updateDisplayPanel(tab: SpTab) {
    if (!this.isValidTabElement(tab)) return;

    const target = tab.getAttribute("panel");

    // タブの選択状態を更新
    this.updateTabSelection(target);

    // パネルの表示状態を更新（重複チェック付き）
    this.updatePanelDisplay(target);
  }

  private updateTabSelection(targetPanel: string | null) {
    const assignedTabs = this.#navSlot.assignedElements();
    assignedTabs.forEach((tab) => {
      if (tab.getAttribute("panel") === targetPanel) {
        tab.setAttribute("selected", "true");
        tab.setAttribute("aria-selected", "true");
      } else {
        tab.removeAttribute("selected");
        tab.setAttribute("aria-selected", "false");
      }
    });
  }

  private updatePanelDisplay(targetPanel: string | null) {
    const assignedPanels = this.#panelSlot.assignedElements();

    // 現在のアクティブパネルを取得
    const currentActivePanel = this.getActivePanel();

    // 既に正しいパネルがアクティブな場合は何もしない
    if (
      currentActivePanel &&
      currentActivePanel.getAttribute("name") === targetPanel
    ) {
      return;
    }

    // 全てのパネルを非アクティブにしてから、対象パネルのみアクティブにする
    assignedPanels.forEach((panel) => {
      if (panel.getAttribute("name") === targetPanel) {
        panel.setAttribute("active", "");
      } else {
        panel.removeAttribute("active");
      }
    });

    // 安全性チェック: 複数のアクティブパネルがないか確認
    this.validateSingleActivePanel();
  }

  private getActivePanel(): Element | null {
    const assignedPanels = this.#panelSlot.assignedElements();
    return assignedPanels.find((panel) => panel.hasAttribute("active")) || null;
  }

  private validateSingleActivePanel(): void {
    const assignedPanels = this.#panelSlot.assignedElements();
    const activePanels = assignedPanels.filter((panel) =>
      panel.hasAttribute("active"),
    );

    if (activePanels.length > 1) {
      console.warn(
        "複数のsp-tab-panelがactiveになっています。最初のもの以外を非アクティブにします。",
        activePanels,
      );

      // 最初のもの以外を非アクティブにする
      activePanels.slice(1).forEach((panel) => {
        panel.removeAttribute("active");
      });
    }
  }

  private ensureSingleActivePanel(): void {
    // 初期化時やslotchange時に呼び出される
    this.validateSingleActivePanel();

    // アクティブパネルがない場合、デフォルトパネルまたは最初のパネルをアクティブにする
    const activePanel = this.getActivePanel();

    if (!activePanel) {
      const initialTab = this.getInitialSelectedTab();
      if (initialTab) {
        const targetPanel = initialTab.getAttribute("panel");
        this.updatePanelDisplay(targetPanel);
        this.updateTabSelection(targetPanel);
      }
    } else {
      // アクティブパネルがある場合、対応するタブも選択状態にする
      const activePanelName = activePanel.getAttribute("name");
      this.updateTabSelection(activePanelName);
    }
  }

  static get observedAttributes() {
    return ["default-panel"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.#navSlot.setAttribute("name", "nav");
    this.#panelSlot.setAttribute("name", "panel");
    this.#navWrapper.classList.add("nav-wrapper");
    this.#navWrapper.appendChild(this.#navSlot);

    this.#panelWrapper.classList.add("panel-wrapper");
    this.#panelWrapper.appendChild(this.#panelSlot);

    this.#navSlot.addEventListener("click", (e) => {
      if (!this.isValidTabElement(e.target)) return;
      this.updateDisplayPanel(e.target);
    });

    // slotchangeイベント(nav slotを監視する)
    this.#navSlot.addEventListener("slotchange", () => {
      this.ensureSingleActivePanel();
    });

    // slotchangeイベント(panel slotを監視する)
    this.#panelSlot.addEventListener("slotchange", () => {
      this.ensureSingleActivePanel();
    });

    this.shadowRoot!.append(this.#navWrapper, this.#panelWrapper);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "default-panel") {
      this.#defaultPanel = newValue;
    }
  }
}

if (!customElements.get("sp-tab-group")) {
  customElements.define("sp-tab-group", SpTabGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tab-group": SpTabGroup;
  }
}
