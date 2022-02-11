//import vue and router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import UserLogin from "../components/UserLogin";
import UserRegistration from "../components/UserRegistration";
import index from "../components/index";
import Movies from "../components/Admin/Movies";
import Genre from "../components/Admin/Genres";
import MovieDetails from "../components/Admin/MovieDetails";
import Users from "../components/Admin/Users"

//user
import user_dashboard from "../components/User/Dashboard";
import user_favourites from "../components/User/Favourites";
import user_movieDetails from "../components/User/MovieDetails";
import user_movies from "../components/User/Movies";
import user_subscriptions from "../components/User/Subscriptions";
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
        {
            path:'/admin',
            component:index,

            children:[
                {
                    path: 'movies',
                    name: 'movies',
                    component:Movies,
                    meta: {
                        requiresAuth:true
                    },
                },
                {
                    path: 'genres',
                    name: 'genres',
                    component:Genre,
                    meta: {
                        requiresAuth:true
                    },
                },
                {
                    path: 'users',
                    name: 'users',
                    component:Users,
                    meta: {
                        requiresAuth:true
                    },
                },

                {
                    path: 'movies/:id',
                    name: 'movieDetails',
                    component:MovieDetails,
                    meta: {
                        requiresAuth:true
                    },
                },
            ]

        },

        {
            path:'/user',
            component:index,

            children:[
                {
                    path: 'dashboard',
                    name: 'user-dashboard',
                    component: user_dashboard,
                    meta: {
                        requiresAuth: true
                    },
                },
                {
                    path: 'movies',
                    name: 'user-movies',
                    component: user_movies,
                    meta: {
                        requiresAuth: true
                    },
                },
                {
                    path: 'favourites',
                    name: 'user-favourites',
                    component: user_favourites,
                    meta: {
                        requiresAuth: true
                    },
                },
                {
                    path: 'subscriptions',
                    name: 'user-subscriptions',
                    component: user_subscriptions,
                    meta: {
                        requiresAuth: true
                    },
                },

                {
                    path: 'movies/:id',
                    name: 'user-movieDetails',
                    component: user_movieDetails,
                    meta: {
                        requiresAuth: true
                    },
                },


            ]
        },


],

    mode: 'history'
});


// Meta Handling
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwToken');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token){
            next({ name: 'login' });
        }
        else {
            next();
        }
    }
    else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwToken') == null) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
});

export default router;