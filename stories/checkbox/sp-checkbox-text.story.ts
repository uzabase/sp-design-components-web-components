import "@sp-design/token/styles/speeda-tokens.css";
import "../../src/components/checkbox/sp-checkbox-text.ts";

export default {
  title: "sp-checkbox-text",
  tags: ["autodocs"],
  render(params) {
    const el = document.createElement("sp-checkbox-text");
    el.setAttribute("text", params.text ?? "Text");
    params.value && el.setAttribute("value", params.value);
    params.name && el.setAttribute("name", params.name);
    params.checked && el.setAttribute("checked", params.checked);
    params.indeterminate &&
      el.setAttribute("indeterminate", params.indeterminate);
    params.disabled && el.setAttribute("disabled", params.disabled);
    return el;
  },
  argTypes: {
    text: { type: "string" },
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};

export const Default = {};
