import {
  createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue3-apexcharts";
import IdleVue from "idle-vue"

// const eventsHub = new Vue();

const app = createApp(App);

app.use(store);
app.use(IdleVue, {
  // eventEmitter: eventsHub,
  store,
  idleTime: 1800000,
  startAtIdle: false
});
app.use(VueApexCharts);
app.use(router);
app.mount("#app");
