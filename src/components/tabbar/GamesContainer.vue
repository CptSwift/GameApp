<template>
	<div class="games_container">
		<div class="mui-card" v-for="(item, i) in gamesList" :key="item.id">
			<router-link tag="div" :to="{path: item.linker}">
				<div class="mui-card-header"><b>{{ item.name }}</b></div>
				<div class="mui-card-header mui-card-media" style="height:40vw; background-image:item.img_src"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>Posted on {{ item.time }}</p>
						<p style="color: #333;">{{ item.des }}</p>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";

	export default {
		data() {
			return {
				gamesList: [{
					id: 1,
					time: '2018-1-1',
					name: '跳一跳',
					des: '模仿Chrome断网小恐龙',
					linker: '/games/jump',
					img_src: '../../images/dragon.jpg'
				},{
					id: 2,
					time: '2018-1-1',
					name: '黑白棋',
					des: '风行文曲星学习机的上古游戏',
					linker: '/games/jump',
					img_src: '../../images/dragon.jpg'
				}]
			}
		}
	};
</script>

<style lang="scss" scoped>
	.games_container{
		background-color: #eee;
		overflow: hidden;
	}
</style>