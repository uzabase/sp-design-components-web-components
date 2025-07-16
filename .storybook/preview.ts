import type { Preview } from "@storybook/web-components-vite";
import dedent from "dedent";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        transform: (src: string) => {
          return dedent(src);
        },
      },
    },
  },
  tags: ["autodocs", "dev-only"],
};

export default preview;
