import VueRouter from 'vue-router'

import GamesContainer from '@/components/tabbar/GamesContainer.vue'
import JumpGame from '@/components/games/jump/JumpGame.vue'

const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/games' },
		{ path: '/games', component: GamesContainer },
		{ path: '/games/jump', component: JumpGame }
	],
	linkActiveClass: 'mui-active'
})

export default router
