import Vue from 'vue';
import Router from 'vue-router';
import Start from '../components/Start';
import About from '../components/About';
import Kanban from '../components/Kanban';
import KanbanBoard from '../components/kanban/KanbanBoard';

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
        {
            path: '/kanban',
            name: 'Kanban',
            component: Kanban,
        },
        {
            path: '/kanbanboard',
            name: 'KanbanBoard',
            component: KanbanBoard,
        },
    ],
});
