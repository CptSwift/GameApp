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
				image: null,
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
					let v = 10, a = 0.2
					let interval = setInterval(() => {
						this.person.stepY -= v
						this.person.drawImage(this.image)
						v -= a
						if(this.person.stepY >= 0) {
							this.jumpFlag = false
							clearInterval(interval)
						}
					}, 10)
				}

			}
		},
		mounted() {
			this.myCanvas = document.querySelector('canvas')
			this.ctx = this.myCanvas.getContext('2d')

			let Person = function(ctx, that) {
				this.that = that
				/*绘制工具*/
				this.ctx = ctx || document.querySelector('canvas').getContext('2d')
				/*图片路径*/
				this.src = require('../../../images/04.png')
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

				/*初始化方法*/
				this.init();
			};

			Person.prototype.loadImage = function(callback) {
				this.that.image = new Image()
				this.that.image.onload = () => {
					callback && callback(this.that.image)
				}
				this.that.image.src = this.src
			}

			Person.prototype.drawImage = function(image) {
				this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
				this.ctx.drawImage(image,
					this.index * this.personWidth, this.direction * this.personHeight,
					this.personWidth, this.personHeight,
					this.x0 + this.stepX * this.stepSize, this.y0 + this.stepY * this.stepSize,
					this.personWidth, this.personHeight)
				if(this.index >= 3) {
					this.index = 0
				}
			}

			Person.prototype.init = function() {
				this.loadImage(image => {
					this.imageWidth = image.width
					this.imageHeight = image.height

					this.personWidth = this.imageWidth / 4
					this.personHeight = this.imageHeight / 4

					this.x0 = 0
					this.y0 = this.canvasHeight / 2 - this.personHeight / 2

					if(this.that.start == false) {
						this.ctx.drawImage(image,
							0, 0,
							this.personWidth, this.personHeight,
							this.x0, this.y0,
							this.personWidth, this.personHeight)

						this.index = 0
						this.that.start = true
					}

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

				})
			}

			this.person = new Person(this.ctx, this);
			//						setInterval(() => {
			//							this.person.index++
			//							this.person.direction = 2
			//							this.person.drawImage(this.image)
			//						}, 200)
		}
	}
</script>

<style>

</style>