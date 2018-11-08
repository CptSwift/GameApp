<template>
	<canvas width="400px" height="600px" @click="jump"></canvas>
</template>

<script>
	export default {
		data() {
			return {
				myCanvas: null,
				ctx: null,
				person: null,
				monster: null,
				image: null,
				imageM: null,
				jumping: false,
				personPos: [],
				monsterPos: []
			}
		},
		methods: {
			jump() {
				this.jumping = true
			},
			judgeFail() {
//				if((this.personPos[2] > this.monsterPos[0] && this.personPos[3] > this.monsterPos[1]) 
//				|| (this.personPos[0] < this.monsterPos[2] && this.personPos[3] > this.monsterPos[1])
//				|| (this.personPos[2] > this.monsterPos[0] && this.personPos[1] < this.monsterPos[1])){
//					console.log('you died')
//				}
//				if(this.personPos[2] > this.monsterPos[0]){
//					console.log('you died')
//				}
				if (this.personPos[2]  > this.monsterPos[0] &&
				    this.monsterPos[2]  > this.personPos[0] &&
				    this.personPos[3] > this.monsterPos[1] &&
				    this.monsterPos[3] > this.personPos[1]){
				    console.log('you died')	
				}
			}
		},
		watch: {
			personPos: function(val){
				//console.log(val)
			},
			monsterPos: function(val){
				//console.log(val)
			},
			jumping: function(val, oldVal) {
				if(val == true) {
					let v = 10,
						a = 0.1,
						start = v
					let interval = setInterval(() => {
						this.person.stepSize = v
						this.person.preStepY = this.person.stepY
						this.person.stepY--
						this.person.drawImage(this.image)
						//console.log(v)
						this.personPos = [this.person.x0 + this.person.stepX * this.person.stepSize, 
										this.person.y0 + this.person.stepY * this.person.stepSize,
										this.person.x0 + this.person.stepX * this.person.stepSize + this.person.personWidth, 
										this.person.y0 + this.person.stepY * this.person.stepSize + this.person.personHeight]
						this.judgeFail()
						v -= a
						if(v <= 0) {
							this.jumping = false
							this.person.stepY = 0
							clearInterval(interval)
						}
					}, 10)
				}

			}
		},
		mounted() {
			this.myCanvas = document.querySelector('canvas')
			this.ctx = this.myCanvas.getContext('2d')

			let Person = function(ctx, src, that, x0, type) {
				/*获取环境变量*/
				this.that = that
				/*绘制工具*/
				this.ctx = ctx || document.querySelector('canvas').getContext('2d')
				/*图片路径*/
				this.src = src
				/*画布的大小*/
				this.canvasWidth = this.ctx.canvas.width
				this.canvasHeight = this.ctx.canvas.height

				/*行走相关参数*/
				this.stepSize = 1;
				/* 0 前  1 左  2 右  3 后  和图片的行数包含的图片对应上*/
				this.direction = 0;
				/*x轴方向的偏移步数*/
				this.stepX = 0;
				/*y轴方向的偏移步数*/
				this.stepY = 0;

				/*x轴方向的上一步偏移步数*/
				this.preStepX = 0;
				/*y轴方向的上一步偏移步数*/
				this.preStepY = 0;

				/*初始化方法*/
				this.init(x0, type);
			};

			Person.prototype.loadImage = function(callback, type) {
				if(type == 'person') {
					this.that.image = new Image()
					this.that.image.onload = () => {
						callback && callback(this.that.image)
					}
					this.that.image.src = this.src
				} else {
					this.that.imageM = new Image()
					this.that.imageM.onload = () => {
						callback && callback(this.that.imageM)
					}
					this.that.imageM.src = this.src
				}

			}

			Person.prototype.drawImage = function(image) {
				let oldX = this.x0 + this.preStepX * this.stepSize
				let oldY = this.y0 + this.preStepY * this.stepSize
				let newX = this.x0 + this.stepX * this.stepSize
				let newY = this.y0 + this.stepY * this.stepSize
				let w = this.personWidth
				let h = this.personHeight
				this.ctx.clearRect(oldX, oldY, w, h)
				this.ctx.drawImage(image,
					this.index * w, this.direction * h,
					w, h, newX, newY, w, h)
				if(this.index >= 3) {
					this.index = 0
				}
			}

			Person.prototype.init = function(x0, type) {
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
					
					let pos = [this.x0 + this.stepX * this.stepSize, 
								this.y0 + this.stepY * this.stepSize,
								this.x0 + this.stepX * this.stepSize + this.personWidth, 
								this.y0 + this.stepY * this.stepSize + this.personHeight]
					if(type == 'person'){
						this.that.personPos = pos
					}
					else{
						this.that.monsterPos = pos
					}

					this.index = 0
				}, type)
			}

			this.person = new Person(this.ctx, require('../../../images/ironman.png'), this, 0, 'person')
			this.monster = new Person(this.ctx, require('../../../images/captainamerica.png'), this, 400, 'monster')

			setInterval(() => {
				this.monster.index++
				this.monster.stepSize = 15
				this.monster.preStepX = this.monster.stepX
				this.monster.stepX--
				this.monster.direction = 1
				this.monster.drawImage(this.imageM)
				
				if(!this.jumping){
					this.person.index++
					this.person.preStepY = this.person.stepY
					this.person.direction = 2
					this.person.drawImage(this.image)
				}
				//console.log(this.monster.stepX)
				this.monsterPos = [this.monster.x0 + this.monster.stepX * this.monster.stepSize, 
									this.monster.y0 + this.monster.stepY * this.monster.stepSize,
									this.monster.x0 + this.monster.stepX * this.monster.stepSize + this.monster.personWidth, 
									this.monster.y0 + this.monster.stepY * this.monster.stepSize + this.monster.personHeight]
				this.judgeFail()
				if(this.monster.stepX < -50) {
					this.monster.stepX = 0
				}
			}, 100)
		}
	}
</script>

<style>

</style>