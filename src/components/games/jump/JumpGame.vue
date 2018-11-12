<template>
	<div @click="jump">
		<score_box :score="score"></score_box>
<!--		<canvas id="background" :width="width" :height="height"></canvas>-->
		<canvas id="person" :width="width" :height="height"></canvas>
		<canvas id="monster" :width="width" :height="height"></canvas>
		<canvas id="fail" :width="width" :height="height"></canvas>
	</div>
</template>

<script>
	import score_box from '@/components/subcomponents/score_box.vue'
	
	export default {
		data() {
			return {
			    id: 0,
				name: '跳一跳',
				person: null,
				monster: null,
				jumping: false,
				interval: null,
				start: true,
				appear: 0,
				score: 0
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
						score: this.score
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
		watch: {
			jumping: function(val, oldVal) {
//				if(val == true) {
//					let v = 20, a = 1
//					this.person.interval = setInterval(() => {
//						this.person.pos[1] -= v
//						this.person.pos[3] -= v
//						this.person.drawImage(this.person.image)
//						this.judgeFail()
//						v -= a
//						if(this.person.pos[1] >= this.person.y0) {
//
//							this.jumping = false
//							clearInterval(this.person.interval)
//						}
//					}, 100)
//				}
			
//				let v1 = 20, a = 1
//				this.monster.interval = setInterval(() => {
//					let v = 10
//					this.monster.index++
//					this.monster.direction = 1
//					this.monster.pos[0] -= v
//					this.monster.pos[2] -= v
//					this.monster.drawImage(this.monster.image)
//	
//					if(!this.jumping) {
//						this.person.index++
//	
//						this.person.direction = 2
//						this.person.drawImage(this.person.image)
//					}
//					else{
//						this.person.pos[1] -= v1
//						this.person.pos[3] -= v1
//						this.person.drawImage(this.person.image)
//						this.judgeFail()
//						v1 -= a
//						if(this.person.pos[1] >= this.person.y0) {
//							this.jumping = false
//						}
//					}
//	
//					this.judgeFail()
//					if(this.monster.pos[0] < -50) {
//						this.monster.pos[0] = this.monster.x0
//					}
//				}, 100)
			}
		},
		mounted() {
			let person_canvas = document.querySelector('#person')
			let person_ctx = person_canvas.getContext('2d')
			
			let monster_canvas = document.querySelector('#monster')
			let monster_ctx = monster_canvas.getContext('2d')

			class Person {
				constructor(ctx, src, x0) {
					/*获取环境变量*/
					//this.that = that
					/*绘制工具*/
					this.ctx = ctx || document.querySelector('canvas').getContext('2d')
					/*图片路径*/
					this.src = src
					/*画布的大小*/
					this.canvasWidth = this.ctx.canvas.width
					this.canvasHeight = this.ctx.canvas.height

					/*行走相关参数*/
					this.stepSize = 1
					/* 0 前  1 左  2 右  3 后  和图片的行数包含的图片对应上*/
					this.direction = 0
					
					/*x轴方向的偏移步数*/
					this.stepX = 0
					/*y轴方向的偏移步数*/
					this.stepY = 0

					/*x轴方向的上一步偏移步数*/
					this.preStepX = 0
					/*y轴方向的上一步偏移步数*/
					this.preStepY = 0
					
					this.prePos = []
					
					/*当前坐标*/
					this.pos = []
					
					/*当前图像*/
					this.image = new Image()
					
					this.imageWidth = 0
					this.imageHeight = 0

					this.personWidth = 0
					this.personHeight = 0

					this.x0 = 0
					this.y0 = 0
					
					this.interval = null;

					/*初始化方法*/
					this.init(x0)
				}

				loadImage(callback, type) {
					//this.image = new Image()
					this.image.onload = () => {
						callback && callback(this.image)
					}
					this.image.src = this.src
				}

				drawImage(image) {
//					let oldX = this.x0 + this.preStepX * this.stepSize
//					let oldY = this.y0 + this.preStepY * this.stepSize
//					let newX = this.x0 + this.stepX * this.stepSize
//					let newY = this.y0 + this.stepY * this.stepSize
					let w = this.personWidth
					let h = this.personHeight
					this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
					this.ctx.drawImage(image,
						this.index * w, this.direction * h,
						w, h, this.pos[0], this.pos[1], w, h)
					if(this.index >= 3) {
						this.index = 0
					}
				}

				init(x0) {
					this.loadImage(image => {
						this.imageWidth = image.width
						this.imageHeight = image.height

						this.personWidth = this.imageWidth / 4
						this.personHeight = this.imageHeight / 4

						this.x0 = x0
						this.y0 = this.canvasHeight / 2 - this.personHeight / 2

						this.ctx.drawImage(image,
							0, 0,
							this.personWidth, this.personHeight,
							this.x0, this.y0,
							this.personWidth, this.personHeight)

						let pos = [this.x0,
							this.y0,
							this.x0 + this.personWidth,
							this.y0 + this.personHeight
						]
						
						this.pos = pos
						this.index = 0
					})
				}
			}

			this.person = new Person(person_ctx, require('../../../images/ironman.png'), 0)
			this.monster = new Person(monster_ctx, require('../../../images/captainamerica.png'), 400)

//			this.monster.interval = setInterval(() => {
//				let v = 10
//				this.monster.index++
//				this.monster.direction = 1
//				this.monster.pos[0] -= v
//				this.monster.pos[2] -= v
//				this.monster.drawImage(this.monster.image)
//
//				if(!this.jumping) {
//					this.person.index++
//
//					this.person.direction = 2
//					this.person.drawImage(this.person.image)
//				}
//
//				this.judgeFail()
//				if(this.monster.pos[0] < -50) {
//					this.monster.pos[0] = this.monster.x0
//				}
//			}, 100)
		}
	}
</script>
<style>
	canvas{
		position: absolute; 
		/*border: 1px solid black*/
	}
</style>