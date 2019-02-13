<template>
    <div class="mui-card">
        <div class="mui-card-header">
            <img :src="share.imgSrc"/>
            <span>{{ share.author }}</span>
        </div>
        <div class="mui-card-content">
            <span>{{ share.text }}</span>
        </div>
        <div class="mui-card-footer footer">
            <button type="button" class="mui-btn mui-btn-outlined mui-icon mui-icon-upload button" @click="share(item)">&nbsp;分享</button>
            <div class="divide"></div>
            <button type="button" class="mui-btn mui-btn-outlined mui-icon mui-icon-trash button">&nbsp;删除</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            share: {
                type: object,
                required: true
            }
        }
    }
</script>

<style>
</style>