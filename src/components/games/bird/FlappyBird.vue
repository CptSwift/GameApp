<template>
    <div @click="jump">
        <score_box :score="score"></score_box>
        <!--		<canvas id="background" :width="width" :height="height"></canvas>-->
        <canvas id="bird" :width="width" :height="height"></canvas>
        <canvas id="woods" :width="width" :height="height"></canvas>
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
                bird: null,
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
                        this.bird.index++
                        this.bird.direction = 2
                        this.bird.drawImage(this.bird.image)
                        this.judgeFail()
                    }
                    if(this.jumping || this.start){
                        this.start = false
                        this.bird.pos[1] -= v_jump
                        this.bird.pos[3] -= v_jump
                        this.bird.direction = 2
                        this.bird.drawImage(this.bird.image)
                        this.judgeFail()
                        v_jump -= a
                        if(this.bird.pos[1] >= this.bird.y0) {
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
                if(this.bird.pos[2] >= this.monster.pos[0] &&
                    this.monster.pos[2] >= this.bird.pos[0] &&
                    this.bird.pos[3] >= this.monster.pos[1] &&
                    this.monster.pos[3] >= this.bird.pos[1]) {
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
        },
        mounted() {
            let bird_canvas = document.querySelector('#bird')
            let bird_ctx = bird_canvas.getContext('2d')

            let monster_canvas = document.querySelector('#monster')
            let monster_ctx = monster_canvas.getContext('2d')

            this.bird = new Person(person_ctx, this.src, 0)
        }
    }
</script>
<style>
    canvas{
        position: absolute;
    }
</style>