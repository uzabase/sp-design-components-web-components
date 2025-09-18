import type { StorybookConfig } from "@storybook/web-components-vite";

const isProduction = process.env.NODE_ENV === "production";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.story.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  tags: {
    "dev-only": { excludeFromSidebar: isProduction },
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    const repo = process.env.REPOSITORY_NAME;
    const basePath = process.env.STORYBOOK_BASE_PATH;
    
    // 開発環境では base パスを設定しない
    const base = isProduction && repo && basePath ? `/${repo}/${basePath}/` : undefined;

    return mergeConfig(config, {
      ...(base && { base }),
      optimizeDeps: {
        exclude: ["@storybook/blocks"],
        include: ["@storybook/web-components"],
      },
    });
  },
};
export default config;
