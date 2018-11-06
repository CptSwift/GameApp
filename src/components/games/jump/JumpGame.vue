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
				jumpFlag: false,
				start: false
			}
		},
		methods: {
			jump() {
				this.jumpFlag = true
			}
		},
		watch: {
			jumpFlag: function(val, oldVal) {
				if(val == true) {
					let v = 10, a = 0.1, start = v
					let interval = setInterval(() => {
						this.person.stepSize = v
						this.person.preStepY = this.person.stepY
						this.person.stepY --
						this.person.drawImage(this.image)
						//console.log(v)
						v -= a
						if(v <= 0) {
							this.jumpFlag = false
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
				if(type == 'person'){
					this.that.image = new Image()
					this.that.image.onload = () => {
						callback && callback(this.that.image)
					}
					this.that.image.src = this.src
				}
				else{
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

						this.index = 0
						this.that.start = true

					//					setInterval(() => {
					//						this.index++
					//						this.direction = 2
					//						this.drawImage(this.that.image)
					//					}, 100)

					//键盘操作
					//					document.onkeydown = e => {
					//						if(e.keyCode == 38) {
					//							/*上*/
					//							this.index++
					//								this.direction = 3
					//							this.stepY--
					//								this.drawImage(image)
					//						} else if(e.keyCode == 40) {
					//							/*下*/
					//							this.index++
					//								this.direction = 0
					//							this.stepY++
					//								this.drawImage(image)
					//						} else if(e.keyCode == 37) {
					//							/*左*/
					//							this.index++
					//								this.direction = 1
					//							this.stepX--
					//								this.drawImage(image)
					//						} else if(e.keyCode == 39) {
					//							/*右*/
					//							this.index++
					//								this.stepX++
					//								this.direction = 2
					//							this.drawImage(image)
					//						}
					//
					//					}

				}, type)
			}

			this.person = new Person(this.ctx, require('../../../images/04.png'), this, 0, 'person')
			this.monster = new Person(this.ctx, require('../../../images/03.png'), this, 400, 'monster')
			
									setInterval(() => {
										this.monster.index++
										this.monster.stepSize = 15
										this.monster.preStepX = this.monster.stepX
										this.monster.stepX --
										this.monster.direction = 1
										this.monster.drawImage(this.imageM)
										console.log(this.monster.stepX)
										if(this.monster.stepX < -50){
											this.monster.stepX = 0
										}
									}, 100)
		}
	}
</script>

<style>

</style>