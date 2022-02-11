import Vue from "vue";
require('./assets/scss/index.scss')
require('./assets/css/index.css')

import './components'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import moment from 'moment'

Vue.prototype.moment = moment

//global filter
Vue.filter("formatDate", function (value) {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a')
});

import VueTailwind from 'vue-tailwind';
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueTailwind)

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);

// element ui



import store from './store'
import router from "./router";


new Vue({
    el: '#app',
    router,
    store
})