import Vue from "vue";
import Blog from "./components/Blog/Index.vue";
import Search from "./components/Blog/Search.vue";
import Newsletter from "./components/Newsletter.vue";

Vue.config.productionTip = false;

new Vue({
  components: {
    Search,
    Blog,
    Newsletter,
  },
}).$mount("#app");
