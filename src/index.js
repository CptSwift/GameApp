import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import moment from 'moment'

import '@/lib/mui/css/mui.min.css'
import '@/lib/mui/css/icons-extra.css'
import 'mint-ui/lib/style.css'

import app from '@/App.vue'
import router from '@/router'

Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(Vuex)

Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD hh:mm:ss") {
    return moment(dataStr).format(pattern)
})

let records = JSON.parse(localStorage.getItem('records') || '[]')
let high_records = JSON.parse(localStorage.getItem('high_records') || '{}')
let shares = JSON.parse(localStorage.getItem('shares') || '[]')

let store = new Vuex.Store({
	state: {
		records: records,
		high_records: high_records,
		shares: shares
	},
	mutations: {
		addToRecord(state, record){				
			state.records.push(record)
			let idStr = toString(record.id);
			if(state.high_records[idStr] == null || this.$store.state.high_records[idStr].score < record.score) {
				state.high_records[idStr] = record;
			}
			localStorage.setItem('records', JSON.stringify(state.records))
			localStorage.setItem('high_records', JSON.stringify(state.high_records))
		},
        addToShare(state, share){
            state.shares.push(share)
            localStorage.setItem('shares', JSON.stringify(state.shares))
        },
		delete(state, index){
        	state.records.splice(index, 1)
            localStorage.setItem('records', JSON.stringify(state.records))
		}
	},
	getters: {
		
	}
})

const vm = new Vue({
	el: '#app',
	render: c => c(app),
	router,
	store
})
