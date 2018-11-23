<template>
	<div>
		<div class="select_container">
			<canvas id="ch1" class="select" :width="width" :height="height" @click="choose(0)"></canvas>
			<canvas id="ch2" class="select" :width="width" :height="height" @click="choose(1)"></canvas>
			<canvas id="ch3" class="select" :width="width" :height="height" @click="choose(2)"></canvas>
			<canvas id="ch4" class="select" :width="width" :height="height" @click="choose(3)"></canvas>
		</div>
		<router-link tag="div" class="button" :to="'/games/jump_start?id=' + id + '&name=' + name "></router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			    id: null,
				name: null,
				persons:[
					{model: null, src: '../../../images/ironman.png'},
					{model: null, src: '../../../images/thor.png'},
					{model: null, src: '../../../images/hulk.png'},
					{model: null, src: '../../../images/blackwidow.png'},
				],
				src: null,
				person1: null,
				person2: null,
				person3: null,
				person4: null,
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
			width() {
        		let screen_w = document.documentElement.clientWidth || document.body.clientWidth
        		let canvas_w = screen_w / 2 
        		return `${ canvas_w }px`
			},
			height() {
				let screen_h = document.documentElement.clientHeight || document.body.clientHeight
        		let canvas_h = (screen_h - 250) / 2 
        		return `${ canvas_h }px`
			}
		},
		watch: {
			choice(val, oldVal) {
				//console.log(`new:${val},old:${oldVal}`)
				
				//let person = this['person' + val]
				let person = this.persons[val].model
				if(oldVal != null) {
					//clearInterval(this['person' + oldVal].interval)
					clearInterval(person.interval)
				}
					
				person.interval = setInterval(() => {
					person.index++
					person.direction = 0
					person.drawImage(person.image)
				}, 100)
			}
		},
		created(){
            this.id = this.$route.query.id
            this.name = this.$route.query.name
            this.src = this.persons[0].src
		},
		mounted() {
			let canvas1 = document.querySelector('#ch1')
			let ctx1 = canvas1.getContext('2d')
						
			let canvas2 = document.querySelector('#ch2')
			let ctx2 = canvas2.getContext('2d')
			
			let canvas3 = document.querySelector('#ch3')
			let ctx3 = canvas3.getContext('2d')
			
			let canvas4 = document.querySelector('#ch4')
			let ctx4 = canvas4.getContext('2d')
			
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
					this.ctx.clearRect(this.x0, this.y0, w*2, h*2)
					this.ctx.drawImage(image,
						this.index * w, this.direction * h,
						w, h, this.x0, this.y0, w*2, h*2)
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
						
						console.log(`长:${this.personWidth},宽:${this.personHeight}`)
	
						this.x0 = this.canvasWidth / 2 - this.personWidth
						this.y0 = this.canvasHeight / 2 - this.personHeight
	
						this.ctx.drawImage(image,
							0, 0,
							this.personWidth, this.personHeight,
							this.x0, this.y0,
							this.personWidth*2, this.personHeight*2)
	
						this.index = 0
					})
				}
			}
			
			this.person[0].model = new Person(ctx1, require('../../../images/ironman.png'))
			this.person[1].model = new Person(ctx2, require('../../../images/thor.png'))
			this.person[2].model = new Person(ctx3, require('../../../images/hulk.png'))
			this.person[3].model = new Person(ctx4, require('../../../images/blackwidow.png'))
		
			this.choice = 0
		}
	}
</script>

<style lang="scss" scoped>
	.select_container{
		background-image: url(../../../images/select_bg.jpg);
		background-size: cover;
		background-position: center center;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		padding-bottom: 50px;
	}

	.select{
		position: relative;
		/*border: 1px solid black;*/
		box-sizing: border-box;
	}
	
	.button{
		height: 110px; 
		box-sizing: border-box;
		background-color: darkred;
		border-top: 10px solid gray;
		border-right: 10px solid darkslategray;
		border-bottom: 10px solid black;
		border-left: 10px solid black;
	}
	
	.button:active{
		border-top: 10px solid black;
		border-right: 10px solid black;
		border-bottom: 10px solid gray;
		border-left: 10px solid darkslategray;
	}

</style>