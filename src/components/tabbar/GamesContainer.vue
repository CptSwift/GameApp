<template>
    <div>

                <!-- 九宫格 到 6宫格 的改造工程 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/games/jump">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">跳一跳</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/photolist">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/goodlist">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></li>
        </ul>

    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    export default {

    };
</script>

<style lang="scss" scoped>

    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
	    img {
	        width: 60px;
	        height: 60px;
	    }
	
	    .mui-media-body{
	        font-size: 13px;
	    }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>
