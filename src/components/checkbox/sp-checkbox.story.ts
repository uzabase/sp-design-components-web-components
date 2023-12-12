import "@sp-design/token/styles/speeda-tokens.css";
import "./sp-checkbox.ts";

export default {
  title: "sp-checkbox",
  tags: ["autodocs"],
  render(params) {
    const el = document.createElement("sp-checkbox");
    params.value && el.setAttribute("value", params.value);
    params.name && el.setAttribute("name", params.name);
    params.checked && el.setAttribute("checked", params.checked);
    params.indeterminate &&
      el.setAttribute("indeterminate", params.indeterminate);
    params.disabled && el.setAttribute("disabled", params.disabled);
    return el;
  },
  argTypes: {
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};

export const Default = {};
