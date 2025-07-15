import "../../src/components/tab/sp-tab";

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTab } from "../../src/components/tab/sp-tab";

const meta = {
  component: "sp-tab",
  argTypes: {
    slot: { type: "string" },
    fill: {
      control: { type: "select" },
      options: ["white", "gray"],
    },
    plusIcon: { type: "boolean" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
  },
  args: {
    slot: "sp-tab",
    fill: "gray",
    plusIcon: false,
    selected: false,
    disabled: false,
    onclick: action("onclick"),
  },
  render: (args) => html`
    <sp-tab
      fill=${args.fill}
      plus-icon=${args.plusIcon}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      @click=${args.onclick}
    >
      ${args.slot}
    </sp-tab>
  `,
} satisfies Meta<SpTab>;
export default meta;

type Story = StoryObj<SpTab>;

export const Basic: Story = {
  tags: ["!dev-only"],
  args: {
    slot: "Basic",
  },
};
export const TypeGray: Story = {
  args: {
    slot: "typeGray",
    fill: "gray",
  },
};
export const TypeWhite: Story = {
  args: {
    slot: "typeWhite",
    fill: "white",
  },
};
export const PlusIcon: Story = {
  args: {
    slot: "plus-icon",
    plusIcon: true,
  },
};


export const All: Story = {
  render: (args) => html`
    <div class="sampleAll">
      <div class="sampleAll__item">
        <p class="sampleAll__title">type:Gray</p>
        <div class="sampleAll__contents">
          <sp-tab
            fill="gray"
            plus-icon=${args.plusIcon}
            selected=${args.selected}
            disabled=${args.disabled}
          >Grayのタブだよ</sp-tab>
        </div>
      </div>
      <div class="sampleAll__item">
        <p class="sampleAll__title">type:White</p>
        <div class="sampleAll__contents">
          <sp-tab
            fill="white"
            plus-icon=${args.plusIcon}
            selected=${args.selected}
            disabled=${args.disabled}
          >Whiteのタブだよ</sp-tab>
        </div>
      </div>
      <div class="sampleAll__item">
        <p class="sampleAll__title">Create New Icon</p>
        <div class="sampleAll__contents">
          <sp-tab
            fill=${args.fill}
            plus-icon="true"
            selected=${args.selected}
            disabled=${args.disabled}
          >新規作成アイコン付きだよ</sp-tab>
        </div>
      </div>
      <p>※複数のタブを使用する場合は sp-tab-group を使用してください</p>
    </div>
  `,
};
