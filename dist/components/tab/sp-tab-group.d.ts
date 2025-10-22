export declare class SpTabGroup extends HTMLElement {
    #private;
    private isValidTabElement;
    private getAllTabs;
    private getEnabledTabs;
    private getNavigableTabs;
    private getCurrentFocusedTab;
    private isNavigationKey;
    private getInitialSelectedTab;
    private updateDisplayPanel;
    private updateTabSelection;
    private updatePanelDisplay;
    private getActivePanel;
    private validateSingleActivePanel;
    private ensureSingleActivePanel;
    private moveFocusToTab;
    private updateTabsAndPanelsAttributes;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tab-group": SpTabGroup;
    }
}
//# sourceMappingURL=sp-tab-group.d.ts.map