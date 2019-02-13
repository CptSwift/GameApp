/**
 * Created by chenz on 2019/1/3.
 */
export class Person {
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

export class Thing {
    constructor(ctx, src, x0) {
        /*绘制工具*/
        this.ctx = ctx || document.querySelector('canvas').getContext('2d')
        /*图片路径*/
        this.src = src
        /*画布的大小*/
        this.canvasWidth = this.ctx.canvas.width
        this.canvasHeight = this.ctx.canvas.height

        this.prePos = []

        /*当前坐标*/
        this.pos = []

        /*当前图像*/
        this.image = new Image()

        this.imageWidth = 0
        this.imageHeight = 0

        this.x0 = 0
        this.y0 = 0

        this.interval = null;

        /*初始化方法*/
        this.init(x0)
    }

    loadImage(callback, type) {
        this.image.onload = () => {
            callback && callback(this.image)
        }
        this.image.src = this.src
    }

    drawImage(image) {
        let w = this.imageWidth
        let h = this.imageHeight
        this.ctx.clearRect(0, 0, w, h)
        this.ctx.drawImage(image,
            0, 0, w, h, this.pos[0], this.pos[1], w, h)
    }

    init(x0, y0) {
        this.loadImage(image => {
            this.imageWidth = image.width
            this.imageHeight = image.height

            this.x0 = x0
            this.y0 = y0

            this.ctx.drawImage(image,
                0, 0,
                this.imageWidth, this.imageHeight,
                this.x0, this.y0,
                this.imageWidth, this.imageHeight)

            let pos = [this.x0,
                this.y0,
                this.x0 + this.imageWidth,
                this.y0 + this.imageHeight
            ]

            this.pos = pos
        })
    }
}

