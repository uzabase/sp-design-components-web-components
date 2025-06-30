import "@sp-design/token/lib/speeda-tokens.css";
import "../../src/components/tag/sp-tag-removable";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpTagRemovable } from "../../src/components/tag/sp-tag-removable";

const meta = {
  component: "sp-tag-removable",
  argTypes: {
    slot: { type: "string" },
    disabled: { type: "boolean" },
    draggable: { type: "boolean" },
  },
  args: {
    slot: "sp-tag-removable-text",
    disabled: false,
    draggable: false,
  },
  render: (args) => {
    return html`<sp-tag-removable
      ?disabled=${args.disabled}
      ?draggable=${args.draggable}
      >${args.slot}</sp-tag-removable
    >`;
  },
} satisfies Meta<SpTagRemovable>;

export default meta;
type Story = StoryObj<SpTagRemovable>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Draggable: Story = {
  tags: ["!dev-only"],
  args: {
    draggable: true,
  },
};

export const DraggableDisabled: Story = {
  args: {
    draggable: true,
    disabled: true,
  },
};

export const MultipleDraggable: Story = {
  tags: ["!dev-only"],
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px;">
          <sp-tag-removable draggable>タグ1</sp-tag-removable>
          <sp-tag-removable draggable>タグ2</sp-tag-removable>
          <sp-tag-removable draggable>タグ3</sp-tag-removable>
        </div>
        <div>
          <p style="font-size: 14px; margin-bottom: 8px;">
            ドラッグイベントデモ:
          </p>
          <div id="drag-demo" style="display: flex; gap: 8px;">
            <sp-tag-removable id="draggable-tag" draggable
              >ドラッグしてください</sp-tag-removable
            >
            <div id="drag-status" style="font-size: 12px; color: #666;"></div>
          </div>
          <script>
            setTimeout(() => {
              const tag = document.getElementById("draggable-tag");
              const status = document.getElementById("drag-status");

              if (tag && status) {
                tag.addEventListener("dragstart", () => {
                  status.textContent = "ドラッグ開始";
                });

                tag.addEventListener("drag", (e) => {
                  status.textContent = \`ドラッグ中: x:\${e.detail.deltaX.toFixed(0)}, y:\${e.detail.deltaY.toFixed(0)}\`;
                });

                tag.addEventListener("dragend", () => {
                  status.textContent = "ドラッグ終了";
                });
              }
            }, 100);
          </script>
        </div>
      </div>
    `;
  },
};
