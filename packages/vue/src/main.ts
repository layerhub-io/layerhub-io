import { createApp } from "vue";
import ViewerPlugin from "./ViewerPlugin";
import App from "./App.vue";

const app = createApp(App);
app.use(ViewerPlugin);
app.mount("#app");
