import "../../src/components/button/sp-button";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { speedaIconTypes } from "../../src/components/icon/icons";
import { action } from "@storybook/addon-actions";
import { html } from "lit";

const meta: Meta = {
  component: "sp-button",
  argTypes: {
    text: { type: "string" },
    icon: {
      control: { type: "select" },
      options: ["", ...speedaIconTypes],
    },
    type: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
    appearance: {
      control: { type: "select" },
      options: ["outline", "fill", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "large", "xLarge", "width160", "width80"],
    },
    loading: { type: "boolean" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
  },
  args: {
    text: "sp-button-text",
    icon: "",
    type: "default",
    appearance: "fill",
    size: "medium",
    loading: false,
    selected: false,
    disabled: false,
    onclick: action("onclick"),
  },
};
export default meta;

type Story = StoryObj;

export const Property: Story = {};

export const Attribute: Story = {
  render: (args) =>
    html`<sp-button
      text=${args.text}
      icon=${args.icon}
      type=${args.type}
      appearance=${args.appearance}
      size=${args.size}
      loading=${args.loading}
      selected=${args.selected}
      disabled=${args.disabled}
    ></sp-button>`,
};

export const AttributeHTML: Story = {
  render: (args) =>
    html`<sp-button
      text=${args.text}
      icon=${args.icon}
      type=${args.type}
      appearance=${args.appearance}
      size=${args.size}
      ?loading=${args.loading}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
    ></sp-button>`,
};
