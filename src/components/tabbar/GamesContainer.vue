<template>
	<div class="games_container">
		<div class="mui-card" v-for="(item, i) in gamesList" :key="item.id">
			<router-link tag="div" :to="{path: item.linker, query: {id: item.id, name: item.name}}">
				<div class="mui-card-header"><b>{{ item.name }}</b></div>
				<div class="mui-card-header mui-card-media" :backgroundImage="item.img_src" :style="{backgroundImage: item.img_src}"></div>
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
	import dragon from "@/images/dragon.jpg"

	export default {
		data() {
			return {
				gamesList: [{
					id: 1,
					time: '2018-1-1',
					name: '跳一跳',
					des: '模仿Chrome断网小恐龙',
					linker: '/games/jump',
                    img_src: dragon
				},{
					id: 2,
					time: '2018-1-1',
					name: '黑白棋',
					des: '风行文曲星学习机的上古游戏',
					linker: '/games/jump',
					img_src: dragon
				},{
                    id: 3,
                    time: '2018-1-1',
                    name: 'Flappy Bird',
                    des: '风靡一时的像素鸟',
                    linker: '/games/bird',
                    img_src: dragon
                },{
					id: 4,
					time: '2018-1-1',
					name: '3d游戏',
					des: '3D',
					linker: '/games/3d',
					img_src: dragon
				}]
			}
		}
	};
</script>

<style lang="scss" scoped>
	.games_container{
		background-color: #eee;
		overflow: hidden;
		padding-bottom: 50px;  /*防止拉不到最底部*/
	}

	.mui-card-media{
		height:40vw;
		//background-image:url(../../images/dragon.jpg);
		background-size: cover;
		background-position: center center;
	}
	
</style>