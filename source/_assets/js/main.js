import Vue from 'vue';
import Blog from './components/Blog.vue';

Vue.config.productionTip = false;

new Vue({
    components: {
        Blog,
    },
}).$mount('#vue-blog');

