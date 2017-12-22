import Vue from 'vue';
import Router from 'vue-router';
import Start from '../components/Start';
import About from '../components/About';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Start',
            component: Start,
        },
        {
            path: '/about',
            name: 'About',
            component: About,
        },
    ],
});
