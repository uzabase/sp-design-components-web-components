import "../../src/components/radio/sp-radio-button-text-group";
import type { Meta, StoryObj } from "@storybook/web-components";
import "@sp-design/token/lib/speeda-tokens.css";
import { action } from "@storybook/addon-actions";

const data = [
  {
    text: "text1",
    value: "value1",
    checked: false,
    disabled: false,
  },
  {
    text: "text2",
    checked: true,
  },
  {
    text: "text3",
    value: "value3",
    checked: false,
    disabled: true,
  },
  {
    text: "nagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitextnagaitext space",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    text: "にほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーんにほんごのぱたーーーーん",
  },
  {
    text: "ながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabledながいdisabled",
    disabled: true,
  },
];

const meta: Meta = {
  title: "Radio/sp-radio-button-text-group",
  component: "sp-radio-button-text-group",
  argTypes: {
    name: { type: "string" },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    data: { type: "string" },
    onchange: {
      action: "onchange",
    },
  },
  args: {
    name: "sp-radio-button-text-group-name",
    direction: "horizontal",
    data: data,
    onchange: action("onchange"),
  },
};
export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    name: undefined,
    direction: undefined,
  },
};
