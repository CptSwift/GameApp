import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'

import '@/lib/mui/css/mui.min.css'
import '@/lib/mui/css/icons-extra.css'
import 'mint-ui/lib/style.css'

import app from '@/App.vue'
import router from '@/router'

Vue.use(VueRouter)
Vue.use(MintUI)

const vm = new Vue({
	el: '#app',
	render: c => c(app),
	router
})
