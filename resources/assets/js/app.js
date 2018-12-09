import Vue from 'vue'
import MainPage from './views/MainPage.vue'

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const app = new Vue({
    render: h => h(MainPage)
}).$mount('#app');
