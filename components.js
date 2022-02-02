
import Vue from 'vue';
require('./components/UserLogin');
require('./components/UserRegistration')
Vue.component('mainComponent', require('./components/index').default)
Vue.component('TheHeader', require('./components/common/TheHeader').default)
