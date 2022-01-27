import Vue from "vue";
require('./assets/scss/index.scss')
require('./assets/css/index.css')
import './components'

// elemt ui
import ElementUI from "element-ui";
Vue.use(ElementUI);

import Router from 'vue-router'
Vue.use(Router)

import store from './store/index'
new Vue({
    el: '#app',
    Router,
    store
})