import VueRouter from 'vue-router'

import GamesContainer from '@/components/tabbar/GamesContainer.vue'
import RecordContainer from '@/components/tabbar/RecordContainer.vue'
import ShareContainer from '@/components/tabbar/ShareContainer.vue'
import JumpGame from '@/components/games/jump/JumpGame.vue'
import SelectPerson from '@/components/games/jump/SelectPerson.vue'

const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/games' },
		{ path: '/games', component: GamesContainer },
		{ path: '/games/jump', component: SelectPerson },
		{ path: '/games/jump/jump_start', component: JumpGame },
		{ path: '/share', component: ShareContainer },
		{ path: '/record', component: RecordContainer }
	],
	linkActiveClass: 'mui-active'
})

export default router
