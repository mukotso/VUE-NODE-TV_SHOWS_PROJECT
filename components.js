
import Vue from 'vue';
require('./components/UserLogin');
Vue.component('mainComponent', require('./components/index').default)
Vue.component('TheHeader', require('./components/common/TheHeader').default)
