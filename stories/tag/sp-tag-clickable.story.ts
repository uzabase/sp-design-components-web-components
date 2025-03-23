import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/tag/sp-tag-clickable";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTagClickable } from "../../src/components/tag/sp-tag-clickable";

const meta = {
  component: "sp-tag-clickable",
  argTypes: {
    slot: { type: "string" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    slot: "Clickable Tag",
    selected: false,
    disabled: false,
  },
  render: (args) => {
    return html`<sp-tag-clickable
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      @click=${() => console.log("Tag clicked")}
      >${args.slot}</sp-tag-clickable
    >`;
  },
} satisfies Meta<SpTagClickable>;

export default meta;
type Story = StoryObj<SpTagClickable>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  tags: ["!dev-only"],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h3>Default State</h3>
        <div style="display: flex; gap: 8px;">
          <sp-tag-clickable>Default</sp-tag-clickable>
        </div>
      </div>

      <div>
        <h3>Selected State</h3>
        <div style="display: flex; gap: 8px;">
          <sp-tag-clickable selected>Selected</sp-tag-clickable>
        </div>
      </div>

      <div>
        <h3>Disabled State</h3>
        <div style="display: flex; gap: 8px;">
          <sp-tag-clickable disabled>Disabled</sp-tag-clickable>
          <sp-tag-clickable selected disabled
            >Disabled Selected</sp-tag-clickable
          >
        </div>
      </div>
    </div>
  `,
};

export const ToggleExample: Story = {
  render: () => {
    // This is just for Storybook demonstration
    // In a real app, you would manage state differently
    return html`
      <div>
        <h3>Click tags to toggle selection</h3>
        <div style="display: flex; gap: 8px;">
          <sp-tag-clickable id="tag1">Option 1</sp-tag-clickable>
          <sp-tag-clickable id="tag2">Option 2</sp-tag-clickable>
          <sp-tag-clickable id="tag3">Option 3</sp-tag-clickable>
        </div>

        <script>
          // For demonstration purposes only
          document.querySelectorAll("sp-tag-clickable").forEach((tag) => {
            tag.addEventListener("click", () => {
              tag.selected = !tag.selected;
            });
          });
        </script>
      </div>
    `;
  },
};
