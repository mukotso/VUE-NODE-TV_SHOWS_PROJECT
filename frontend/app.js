import Vue from "vue";
require('./assets/scss/index.scss')
require('./assets/css/index.css')

import './components'

// elemt ui
import ElementUI from "element-ui";
Vue.use(ElementUI);


import store from './store'
import router from "./router";


new Vue({
    el: '#app',
    router,
    store
})