//import vue and router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import UserLogin from "../components/UserLogin";
import UserRegistration from "../components/UserRegistration";
import index from "../components";

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
        },
        {
            path: '/login',
            name: 'login',
            component: UserLogin,
        },{
            path: '/register',
            name: 'register',
            component:UserRegistration,
        },
    ],
    mode: 'history'
});

export default router;