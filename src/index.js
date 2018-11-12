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

let record = JSON.parseInt(localStorage.getItem('records') || [])

let store = new Vuex.Store({
	state: {
		records: records
	},
	mutations: {
		addToRecord(state, record){
			state.records.push(record)
			localStorage.setItem('records', JSON.stringify(state.records))
		}
	},
	getters: {
		
	}
})

const vm = new Vue({
	el: '#app',
	render: c => c(app),
	router
})
