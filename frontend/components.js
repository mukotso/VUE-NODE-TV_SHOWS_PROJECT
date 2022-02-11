
import Vue from 'vue';
require('./components/UserLogin');
require('./components/UserRegistration');
require('./components/Admin/Movies');
require('./components/Admin/Genres');
require('./components/Admin/Users');
//user
require ('./components/User/Movies')
require ('./components/User/Dashboard')
require ('./components/User/Favourites')
require ('./components/User/MovieDetails')
require ('./components/User/Subscriptions')
Vue.component('mainComponent', require('./components/index').default)

Vue.component('NavBar', require('./components/common/NavBar').default)