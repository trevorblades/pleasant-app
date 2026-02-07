import lynxPreset from "@lynx-js/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [lynxPreset],
} satisfies Config;
