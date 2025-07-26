import "../../../src/components/form/character-counter/sp-character-counter";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpCharacterCounter } from "../../../src/components/form/character-counter/sp-character-counter";

const meta = {
  component: "sp-character-counter",
  argTypes: {
    current: { type: "number" },
    max: { type: "number" },
  },
  render: (args) => html`
    <sp-character-counter
      current=${args.current ?? 0}
      max=${args.max ?? 0}
    ></sp-character-counter>
  `,
} satisfies Meta<SpCharacterCounter>;

export default meta;
type Story = StoryObj<SpCharacterCounter>;

export const Basic: Story = {
  args: {
    current: 5,
    max: 20,
  },
  tags: ["!dev-only"],
};

export const NormalState: Story = {
  args: {
    current: 3,
    max: 20,
  },
};

export const LimitReached: Story = {
  args: {
    current: 20,
    max: 20,
  },
};

export const LimitExceeded: Story = {
  args: {
    current: 25,
    max: 20,
  },
};

export const VariousLimits: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <sp-character-counter current="5" max="10"></sp-character-counter>
      </div>
      <div>
        <sp-character-counter current="10" max="10"></sp-character-counter>
      </div>
      <div>
        <sp-character-counter current="15" max="10"></sp-character-counter>
      </div>
      <div>
        <sp-character-counter current="0" max="100"></sp-character-counter>
      </div>
    </div>
  `,
};
