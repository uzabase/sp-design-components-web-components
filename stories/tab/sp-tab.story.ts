import "../../src/components/tab/sp-tab";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { action } from "@storybook/addon-actions";
import { html } from "lit";
import { SpTab } from "../../src/components/tab/sp-tab";

const meta = {
  component: "sp-tab",
  argTypes: {
    text: { type: "string" },
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
    text: "sp-tab",
    fill: "gray",
    plusIcon: false,
    selected: false,
    disabled: false,
    onclick: action("onclick"),
  },
  render: (args) => html`
    <sp-tab
      text=${args.text}
      fill=${args.fill}
      plus-icon=${args.plusIcon}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      @click=${args.onclick}
    >
    </sp-tab>
  `,
} satisfies Meta<SpTab>;
export default meta;

type Story = StoryObj<SpTab>;

export const Basic: Story = {
  args: {
    text: "Basic",
  },
};
export const typeGray: Story = {
  args: {
    text: "typeGray",
    fill: "gray",
  },
};
export const typeWhite: Story = {
  args: {
    text: "typeWhite",
    fill: "white",
  },
};
export const plusIcon: Story = {
  args: {
    text: "plus-icon",
    plusIcon: true,
  },
};

export const list: Story = {
  render: (args) =>
    html`<div class="tabList">
      <sp-tab
        text="tabList"
        fill=${args.fill}
        plus-icon=${args.plusIcon}
        selected=${args.selected}
        disabled=${args.disabled}
      ></sp-tab>
      <sp-tab
        text="tabList"
        fill=${args.fill}
        plus-icon=${args.plusIcon}
        selected=${args.selected}
        disabled=${args.disabled}
      ></sp-tab>
      <sp-tab
        text="tabList"
        fill=${args.fill}
        plus-icon=${args.plusIcon}
        selected=${args.selected}
        disabled=${args.disabled}
      ></sp-tab>
    </div>`,
};

export const All: Story = {
  render: (args) => html`
    <div class="sampleAll">
      <div class="sampleAll__item">
        <p class="sampleAll__title">type:Gray</p>
        <div class="sampleAll__contents">
          <sp-tab
            text="Grayのタブだよ"
            fill="gray"
            plus-icon=${args.plusIcon}
            selected=${args.selected}
            disabled=${args.disabled}
          ></sp-tab>
        </div>
      </div>
      <div class="sampleAll__item">
        <p class="sampleAll__title">type:White</p>
        <div class="sampleAll__contents">
          <sp-tab
            text="Whiteのタブだよ"
            fill="white"
            plus-icon=${args.plusIcon}
            selected=${args.selected}
            disabled=${args.disabled}
          ></sp-tab>
        </div>
      </div>
      <div class="sampleAll__item">
        <p class="sampleAll__title">Create New Icon</p>
        <div class="sampleAll__contents">
          <sp-tab
            text="新規作成アイコン付きだよ"
            fill=${args.fill}
            plus-icon="true"
            selected=${args.selected}
            disabled=${args.disabled}
          ></sp-tab>
        </div>
      </div>
      <div class="sampleAll__item">
        <p class="sampleAll__title">List</p>
        <div class="sampleAll__contents">
          <div class="tabList">
            <sp-tab
              text="タブのリストだよ"
              fill=${args.fill}
              plus-icon=${args.plusIcon}
              selected=${args.selected}
              disabled=${args.disabled}
            ></sp-tab>
            <sp-tab
              text="タブのリストだよ"
              fill=${args.fill}
              plus-icon=${args.plusIcon}
              selected=${args.selected}
              disabled=${args.disabled}
            ></sp-tab>
            <sp-tab
              text="タブのリストだよ"
              fill=${args.fill}
              plus-icon=${args.plusIcon}
              selected=${args.selected}
              disabled=${args.disabled}
            ></sp-tab>
          </div>
        </div>
      </div>
    </div>
  `,
};
