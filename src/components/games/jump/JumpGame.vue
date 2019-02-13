<template>
	<div @click="jump">
		<score_box :score="score" :high_score="high_score"></score_box>
<!--		<canvas id="background" :width="width" :height="height"></canvas>-->
		<canvas id="person" :width="width" :height="height"></canvas>
		<canvas id="monster" :width="width" :height="height"></canvas>
		<canvas id="fail" :width="width" :height="height"></canvas>
	</div>
</template>

<script>
	import score_box from '@/components/subcomponents/score_box.vue'
	import Person from '@/components/games/game_util.js'
	
	export default {
		data() {
			return {
			    id: null,
				name: null,
				src: null,
				person: null,
				monster: null,
				jumping: false,
				interval: null,
				start: true,
				appear: 0,
				score: 0,
				high_score: 0
			}
		},
		computed: {
			width() {
        		let screen_w = document.documentElement.clientWidth || document.body.clientWidth
        		let canvas_w = screen_w 
        		return `${ canvas_w }px`
			},
			height() {
				let screen_h = document.documentElement.clientHeight || document.body.clientHeight
        		let canvas_h = screen_h - 90
        		return `${ canvas_h }px`
			},
			style(){
				let top = this.height / 2
				console.log(this.height)
				return `top:${ top }px`
			}
		},
		components: {
			score_box
		},
		methods: {
			jump() {
			    if(this.jumping){
			        return
				}
				this.jumping = true
				
				let v_jump = 40, a = 10
				if(this.interval) clearInterval(this.interval)
				this.interval = setInterval(() => {
					this.score++
					let v_mon = this.randomNum(20,40)
					this.monster.index++
					this.monster.direction = 1
					this.monster.pos[0] -= v_mon
					this.monster.pos[2] -= v_mon
					this.monster.drawImage(this.monster.image)
	
					if(!this.jumping) {
						this.person.index++	
						this.person.direction = 2
						this.person.drawImage(this.person.image)
						this.judgeFail()
					}
					if(this.jumping || this.start){
						this.start = false
						this.person.pos[1] -= v_jump
						this.person.pos[3] -= v_jump
						this.person.direction = 2
						this.person.drawImage(this.person.image)
						this.judgeFail()
                        v_jump -= a
						if(this.person.pos[1] >= this.person.y0) {
							this.jumping = false
						}
					}
	
					if(this.monster.pos[0] < this.appear) {
						console.log(this.appear)
						this.appear = this.randomNum(-50, 0)
						this.monster.pos[0] = this.monster.x0
						this.monster.pos[2] = this.monster.x0 + this.monster.personWidth
					}
				}, 100)
			},
			judgeFail() {
				//console.log('judging...')
				if(this.person.pos[2] >= this.monster.pos[0] &&
					this.monster.pos[2] >= this.person.pos[0] &&
					this.person.pos[3] >= this.monster.pos[1] &&
					this.monster.pos[3] >= this.person.pos[1]) {
					console.log('you died')
					let canvas = document.querySelector('#fail')
					let ctx = canvas.getContext('2d')
					ctx.fillStyle="#FF0000";
					clearInterval(this.interval)
					let w = ctx.canvas.width, h = ctx.canvas.height
					let ww = 0, hh = 0
					this.interval = setInterval(() =>{
						hh+=20
						ctx.fillRect(0, 0, w, hh);
						if(hh >= h) clearInterval(this.interval)
					},100)

					//分数计入记录
					let record = {
					    id: this.id,
						name: this.name,
						score: this.score,
						time: new Date()
					}
					this.$store.commit('addToRecord', record)

				}
			},
			randomNum(minNum,maxNum) { 
			    switch(arguments.length){ 
			        case 1: 
			            return parseInt(Math.random() * minNum + 1, 10)
			        break
			        case 2: 
			            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
			        break 
			            default: 
			                return 0
			            break 
			    } 
			} 
		},
		created() {
            this.id = this.$route.query.id
			this.name = this.$route.query.name
			this.src = this.$route.query.src
			this.high_score = this.$store.state.high_records[this.id] == null ? 0 : this.$store.state.high_records[this.id].score;
		},
		mounted() {
			let person_canvas = document.querySelector('#person')
			let person_ctx = person_canvas.getContext('2d')
			
			let monster_canvas = document.querySelector('#monster')
			let monster_ctx = monster_canvas.getContext('2d')



			this.person = new Person(person_ctx, this.src, 0)
			this.monster = new Person(monster_ctx, require('../../../images/captainamerica.png'), 400)
		}
	}
</script>
<style>
	canvas{
		position: absolute; 
		/*border: 1px solid black*/
	}
</style>