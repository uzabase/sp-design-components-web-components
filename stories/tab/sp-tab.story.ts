import "../../src/components/tab/sp-tab";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { action } from "@storybook/addon-actions";
import { html } from "lit";

const meta: Meta = {
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
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    fill: "gray",
    plusIcon: undefined,
    selected: undefined,
    disabled: undefined,
  },
};
export const typeGray: Story = {
  args: {
    fill: "gray",
    plusIcon: undefined,
    selected: undefined,
    disabled: undefined,
  },
};
export const typeWhite: Story = {
  args: {
    fill: "white",
    plusIcon: undefined,
    selected: undefined,
    disabled: undefined,
  },
};
export const plusIcon: Story = {
  args: {
    fill: undefined,
    plusIcon: true,
    selected: undefined,
    disabled: undefined,
  },
};

export const list: Story = {
  render: (args) =>
    html`<div class="tabList">
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
            text="新規作成アイコン付き"
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
