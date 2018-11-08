<template>
	<div class="select_container">
		<canvas id="ch1" class="select" :style="style" @click="choose(1)"></canvas>
		<canvas id="ch2" class="select" :style="style" @click="choose(2)"></canvas>
		<canvas id="ch3" class="select" :style="style" @click="choose(3)"></canvas>
		<canvas id="ch4" class="select" :style="style" @click="choose(4)"></canvas>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				ctx1: null,
				ctx2: null,
				ctx3: null,
				ctx4: null,
				
				person1: null,
				person2: null,
				
				choice: null
			}
		},
		methods: {
			choose(choice) {
				console.log(choice)
				this.choice = choice
			}
		},
		computed: {
			style() {
				let screen_h = document.documentElement.clientHeight || document.body.clientHeight
        		let canvas_h = (screen_h - 180) / 2 
        		let screen_w = document.documentElement.clientWidth || document.body.clientWidth
        		let canvas_w = screen_w / 2 
        		return `width: ${ canvas_w }px; height: ${ canvas_h }px`
			}
		},
		watch: {
			choice(val, oldVal) {
				console.log(`new:${val},old:${oldVal}`)
				
				let person = this['person' + val]
				if(oldVal != null) {
					clearInterval(this['person' + oldVal].interval)
				}
					
				person.interval = setInterval(() => {
					person.index++
					person.direction = 0
					person.drawImage(person.image)
				}, 100)
			}
		},
		mounted() {
			let canvas1 = document.querySelector('#ch1')
			this.ctx1 = canvas1.getContext('2d')
						
			let canvas2 = document.querySelector('#ch2')
			this.ctx2 = canvas2.getContext('2d')
			
			let canvas3 = document.querySelector('#ch3')
			this.ctx3 = canvas3.getContext('2d')
			
			let canvas4 = document.querySelector('#ch4')
			this.ctx4 = canvas4.getContext('2d')
			
			class Person{
				constructor(ctx, src) {
					/*获取环境变量*/
					//this.that = that
					/*绘制工具*/
					this.ctx = ctx || document.querySelector('canvas').getContext('2d')
					/*初始化图片*/
					this.image = new Image()
					/*初始化定时器*/
					this.interval = null
					/*图片路径*/
					this.src = src
					/*画布的大小*/
					this.canvasWidth = this.ctx.canvas.width
					this.canvasHeight = this.ctx.canvas.height

					/* 0 前  1 左  2 右  3 后  和图片的行数包含的图片对应上*/
					this.direction = 0;
	
					/*初始化方法*/
					this.init();
				}

			    loadImage(callback) {
					this.image.onload = () => {
						callback && callback(this.image)
					}
					this.image.src = this.src
				}

				drawImage(image) {
					let w = this.personWidth
					let h = this.personHeight
					this.ctx.clearRect(this.x0, this.y0, w, h)
					this.ctx.drawImage(image,
						this.index * w, this.direction * h,
						w, h, this.x0, this.y0, w, h)
					if(this.index >= 3) {
						this.index = 0
					}
				}

				init() {
					this.loadImage(image => {
						console.log('initing...')
						
						this.imageWidth = image.width
						this.imageHeight = image.height
	
						this.personWidth = this.imageWidth / 4
						this.personHeight = this.imageHeight / 4
	
						this.x0 = this.canvasWidth / 2 - this.personWidth / 2
						this.y0 = this.canvasHeight / 2 - this.personHeight / 2
	
						this.ctx.drawImage(image,
							0, 0,
							this.personWidth, this.personHeight,
							this.x0, this.y0,
							this.personWidth, this.personHeight)
	
						this.index = 0
					})
				}
			}
			
			this.person1 = new Person(this.ctx1, require('../../../images/ironman.png'))
			this.person2 = new Person(this.ctx2, require('../../../images/thor.png'))
		}
	}
</script>

<style lang="scss" scoped>

	.select_container{
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 50px;
	}

	.select{
		border: 1px solid black; 
		box-sizing: border-box;
	}

</style>