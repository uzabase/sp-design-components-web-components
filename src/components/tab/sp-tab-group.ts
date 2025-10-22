import "./sp-tab";
import "./sp-tab-panel";

import { makeStyleSheet } from "../styles";
import type { SpTab } from "./sp-tab";
import tabGroupStyle from "./tab-group.css?inline";

const styles = makeStyleSheet(tabGroupStyle);

export class SpTabGroup extends HTMLElement {
  #navSlot = document.createElement("slot");
  #panelSlot = document.createElement("slot");
  #navWrapper = document.createElement("div");
  #panelWrapper = document.createElement("div");
  #defaultPanel: string | null = null;
  #handleKeyDownBound = this.#handleKeyDown.bind(this);

  private isValidTabElement(target: EventTarget | null): target is SpTab {
    return (
      target instanceof HTMLElement &&
      target.getAttribute("slot") === "nav" &&
      target.tagName === "SP-TAB" &&
      !target.hasAttribute("disabled")
    );
  }

  private getAllTabs(): SpTab[] {
    return this.#navSlot
      .assignedElements()
      .filter(
        (e): e is SpTab =>
          e instanceof HTMLElement &&
          e.getAttribute("slot") === "nav" &&
          e.tagName === "SP-TAB",
      );
  }

  private getEnabledTabs(): SpTab[] {
    return this.getAllTabs().filter((tab) => !tab.hasAttribute("disabled"));
  }

  private getNavigableTabs(): SpTab[] {
    // 矢印キーナビゲーションでは有効なタブのみを対象とする
    return this.getEnabledTabs();
  }

  private getCurrentFocusedTab(): SpTab | null {
    const tabs = this.getAllTabs();
    return tabs.find((tab) => document.activeElement === tab) || null;
  }

  private isNavigationKey(event: KeyboardEvent): boolean {
    const key = event.key;
    const keyCode = event.keyCode;

    // 現代的なevent.keyをチェック
    if (
      key === "ArrowRight" ||
      key === "Right" ||
      key === "ArrowLeft" ||
      key === "Left" ||
      key === "Home" ||
      key === "End" ||
      key === "Enter" ||
      key === " " ||
      key === "Spacebar"
    ) {
      return true;
    }

    // フォールバック: keyCodeをチェック（古いブラウザ対応）
    return (
      keyCode === 37 ||
      keyCode === 39 || // Arrow keys
      keyCode === 36 ||
      keyCode === 35 || // Home/End
      keyCode === 13 ||
      keyCode === 32
    ); // Enter/Space
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
    let activeTabSet = false;

    assignedTabs.forEach((tab) => {
      const isDisabled = tab.hasAttribute("disabled");
      const isTargetTab = tab.getAttribute("panel") === targetPanel;

      if (isTargetTab) {
        tab.setAttribute("selected", "");
        tab.setAttribute("aria-selected", "true");
        // roving tabindex: 選択されたタブのみtabindex="0"（disabledでない場合）
        if (!isDisabled && !activeTabSet) {
          tab.setAttribute("tabindex", "0");
          activeTabSet = true;
        } else {
          tab.setAttribute("tabindex", "-1");
        }
      } else {
        tab.removeAttribute("selected");
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("tabindex", "-1");
      }
    });

    // 選択されたタブがdisabledの場合、最初の有効なタブにtabindex="0"を設定
    // ただし、有効なタブがない場合は最初のタブ（disabledでも）にtabindex="0"を設定
    if (!activeTabSet) {
      const enabledTabs = this.getEnabledTabs();
      if (enabledTabs.length > 0) {
        enabledTabs[0].setAttribute("tabindex", "0");
      } else {
        // 全てのタブがdisabledの場合、最初のタブにtabindex="0"を設定
        const allTabs = this.getAllTabs();
        if (allTabs.length > 0) {
          allTabs[0].setAttribute("tabindex", "0");
        }
      }
    }
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
        // アクティブなパネルをフォーカス可能にする
        panel.setAttribute("tabindex", "0");
      } else {
        panel.removeAttribute("active");
        // 非アクティブなパネルはフォーカス不可にする
        panel.setAttribute("tabindex", "-1");
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

    // タブとパネルの属性を更新
    this.updateTabsAndPanelsAttributes();

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

  #handleKeyDown(event: KeyboardEvent): void {
    // ナビゲーションキーでない場合は早期リターン
    if (!this.isNavigationKey(event)) return;

    const currentTab = this.getCurrentFocusedTab();
    if (!currentTab) return;

    // 矢印キーナビゲーションでは有効なタブのみを対象とする
    const navigableTabs = this.getNavigableTabs();
    const currentIndex = navigableTabs.indexOf(currentTab);

    if (currentIndex === -1) return;

    let targetTab: SpTab | null = null;

    // Windows/Mac/Linuxでの互換性を確保するため、event.keyとkeyCodeの両方をチェック
    const key = event.key;
    const keyCode = event.keyCode;

    switch (key) {
      case "ArrowRight":
      case "Right": // IE/Edge対応
        event.preventDefault();
        // 次のタブへ移動（最後の場合は最初に戻る）
        targetTab = navigableTabs[(currentIndex + 1) % navigableTabs.length];
        break;

      case "ArrowLeft":
      case "Left": // IE/Edge対応
        event.preventDefault();
        // 前のタブへ移動（最初の場合は最後に戻る）
        targetTab =
          navigableTabs[
            (currentIndex - 1 + navigableTabs.length) % navigableTabs.length
          ];
        break;

      case "Home":
        event.preventDefault();
        // 最初の有効なタブへ移動
        targetTab = navigableTabs[0];
        break;

      case "End":
        event.preventDefault();
        // 最後の有効なタブへ移動
        targetTab = navigableTabs[navigableTabs.length - 1];
        break;

      case "Enter":
      case " ": // Space key
      case "Spacebar": // IE対応
        event.preventDefault();
        // 現在フォーカスされているタブを活性化（有効なタブのみ）
        if (this.isValidTabElement(currentTab)) {
          this.updateDisplayPanel(currentTab);
        }
        // disabledタブの場合は何もしない（フォーカスは維持）
        break;

      default:
        // keyCodeでのフォールバック（古いブラウザ対応）
        switch (keyCode) {
          case 39: // ArrowRight
            event.preventDefault();
            targetTab =
              navigableTabs[(currentIndex + 1) % navigableTabs.length];
            break;
          case 37: // ArrowLeft
            event.preventDefault();
            targetTab =
              navigableTabs[
                (currentIndex - 1 + navigableTabs.length) % navigableTabs.length
              ];
            break;
          case 36: // Home
            event.preventDefault();
            targetTab = navigableTabs[0];
            break;
          case 35: // End
            event.preventDefault();
            targetTab = navigableTabs[navigableTabs.length - 1];
            break;
          case 13: // Enter
          case 32: // Space
            event.preventDefault();
            if (this.isValidTabElement(currentTab)) {
              this.updateDisplayPanel(currentTab);
            }
            break;
          default:
            return; // 他のキーは処理しない
        }
        break;
    }

    // フォーカスを移動
    if (targetTab && targetTab !== currentTab) {
      this.moveFocusToTab(targetTab);
    }
  }

  private moveFocusToTab(tab: SpTab): void {
    // 現在フォーカスされているタブのtabindexを-1に設定
    const currentFocused = this.getCurrentFocusedTab();
    if (currentFocused && currentFocused !== tab) {
      currentFocused.setAttribute("tabindex", "-1");
    }

    // 新しいタブにフォーカスを移動してtabindexを0に設定
    // disabledタブでもフォーカスは可能にする（スクリーンリーダー対応）
    tab.setAttribute("tabindex", "0");
    tab.focus();
  }

  private updateTabsAndPanelsAttributes(): void {
    const assignedTabs = this.#navSlot.assignedElements();
    const assignedPanels = this.#panelSlot.assignedElements();

    // 各タブにIDとaria-controlsを設定
    assignedTabs.forEach((tab) => {
      const panelName = tab.getAttribute("panel");
      if (!panelName) return;

      // タブのIDを設定（存在しない場合のみ）
      if (!tab.id) {
        tab.id = `tab-${panelName}`;
      }

      // 対応するパネルを見つけてaria-controlsを設定
      const correspondingPanel = assignedPanels.find(
        (panel) => panel.getAttribute("name") === panelName,
      );
      if (correspondingPanel) {
        // パネルのIDを設定（存在しない場合のみ）
        if (!correspondingPanel.id) {
          correspondingPanel.id = `panel-${panelName}`;
        }
        // タブのaria-controlsをパネルのIDに設定
        tab.setAttribute("aria-controls", correspondingPanel.id);
        // パネルのaria-labelledbyをタブのIDに設定（推奨だが必須ではない）
        correspondingPanel.setAttribute("aria-labelledby", tab.id);

        // パネルのtabindex属性を設定
        const isActive = correspondingPanel.hasAttribute("active");
        correspondingPanel.setAttribute("tabindex", isActive ? "0" : "-1");
      }
    });
  }

  static get observedAttributes() {
    return ["default-panel"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [styles];

    // イベントリスナーをコンストラクタで登録
    this.#navSlot.addEventListener("click", (e) => {
      if (!this.isValidTabElement(e.target)) return;
      this.updateDisplayPanel(e.target);
    });
  }

  connectedCallback() {
    this.#navSlot.setAttribute("name", "nav");
    this.#panelSlot.setAttribute("name", "panel");
    this.#navWrapper.classList.add("nav-wrapper");
    this.#navWrapper.setAttribute("role", "tablist");
    this.#navWrapper.appendChild(this.#navSlot);

    this.#panelWrapper.classList.add("panel-wrapper");
    this.#panelWrapper.appendChild(this.#panelSlot);

    // キーボードイベントリスナーを追加
    this.addEventListener("keydown", this.#handleKeyDownBound);

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

  disconnectedCallback() {
    // イベントリスナーをクリーンアップ
    this.removeEventListener("keydown", this.#handleKeyDownBound);
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
