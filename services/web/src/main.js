import Vue from 'vue';
import Buefy from 'buefy';
import App from './App';
import router from './router';


// const vueConfig = require('vue-config');

Vue.config.productionTip = false;
Vue.use(Buefy);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App,
    },
});
