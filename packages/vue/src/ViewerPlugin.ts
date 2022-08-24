import type { App } from "vue";
import { Canvas, name } from "./components";
export * from "./components/state";

export default {
  install: (app: App, options: { name: string }) => {
    app.component("SpecialButton", Canvas);
    app.provide;
  },
};

export { Canvas, name };
