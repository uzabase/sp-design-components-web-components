import "@sp-design/token/styles/speeda-tokens.css";
import "./sp-icon.ts";

export default {
  title: "sp-icon",
  tags: ["autodocs"],
  render(params) {
    const el = document.createElement("sp-icon");
    el.setAttribute("text", params.text ?? "Text");
    el.setAttribute("type", params.type ?? "home");
    params.color && el.setAttribute("color", params.color);
    params.size && el.setAttribute("size", params.size);
    return el;
  },
  argTypes: {
    text: { type: "string" },
    type: { type: "string" },
    color: {
      control: { type: "select" },
      options: ["black", "white"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
  },
};

export const Default = {};
