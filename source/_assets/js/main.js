import Vue from "vue";
import Blog from "./components/Blog/Index.vue";
import Newsletter from "./components/Newsletter.vue";

Vue.config.productionTip = false;

new Vue({
  components: {
    Blog,
    Newsletter,
  },
}).$mount("#app");
