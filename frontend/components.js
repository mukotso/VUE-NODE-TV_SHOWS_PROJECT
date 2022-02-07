
import Vue from 'vue';
require('./components/UserLogin');
require('./components/UserRegistration')
Vue.component('mainComponent', require('./components').default)
Vue.component('TheHeader', require('./components/common/TheHeader').default)
