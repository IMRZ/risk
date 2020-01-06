import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

const App = require("./App.vue").default;

new Vue({
  render: h => h(App)
}).$mount("#app");
