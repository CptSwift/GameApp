<template>
    <div>
        <canvas id="container" :width="width" :height="height"></canvas>
    </div>
</template>

<script>
    import * as THREE from 'three'
    import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader'
    const OrbitControls = require('three-orbit-controls')(THREE);

    export default {

        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                controls: null
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
        methods: {
            init: function() {
                let container = document.getElementById('container')
                // 创建场景
                this.scene = new THREE.Scene()
                // 创建透视相机
                this.camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 0.1, 1000)
                // 创建一个 WebGL 渲染器
                this.renderer = new THREE.WebGLRenderer({
                    alpha: true// 默认情况下为黑色场景，此处设置为透明（即白色场景）
                })
                // 设置渲染器为全屏
                this.renderer.setSize(window.innerWidth, window.innerHeight)
                // 添加到网页中
                container.appendChild(this.renderer.domElement)

            },
            initCube: function () {
                var geometry = new THREE.BoxGeometry(10,10,10) // 创建一个长宽高都为1个单位的立方体
                var material = new THREE.MeshBasicMaterial({color: 0xffffff}) // 创建材质，对光照无感
                this.mesh = new THREE.Mesh(geometry, material) // 创建一个立方体网格（mesh）,将材质包裹在立方体上
                this.scene.add(this.mesh) // 将立方体网格添加到场景中

                this.camera.position.z = 5 // 指定相机位置
                this.render();
            },
            initControls: function () {
                this.controls = new OrbitControls(this.camera);// 初始化控制器
                this.controls.target.set(0, 0, 0);// 设置控制器的焦点，使控制器围绕这个焦点进行旋转
                this.controls.minDistance = 80;// 设置移动的最短距离（默认为零）
                this.controls.maxDistance = 400;// 设置移动的最长距离（默认为无穷）
                this.controls.maxPolarAngle = Math.PI / 3;//绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
                this.controls.update();// 照相机转动时，必须更新该控制器
            },
            render: function () {
                requestAnimationFrame(this.render) // 让浏览器执行参数中的函数，不断循环（浏览器一个新的API）
//                this.mesh.rotation.x += 0.1
//                this.mesh.rotation.y += 0.1
                this.renderer.render(this.scene, this.camera) // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
            }
        },
        mounted() {
            this.init()
            this.initCube()
            this.initControls()
        }
    }
</script>

<style scoped>
    canvas{
        position: absolute;
    }
</style>