<template>
	<div class="record-container">
		<div class="mui-card" v-for="(item, i) in records" :key="item.time">
			<div class="mui-card-header"><b>{{ item.name }}</b></div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">分数：{{ item.score }}</div>
				<div class="mui-card-content-inner">时间：{{ item.score | dataFormat }}</div>
			</div>
			<div class="mui-card-footer footer">
				<button type="button" class="mui-btn mui-btn-outlined mui-icon mui-icon-upload button" @click="share(item)">&nbsp;分享</button>
				<div class="divide"></div>
				<button type="button" class="mui-btn mui-btn-outlined mui-icon mui-icon-trash button">&nbsp;删除</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				records: []
			}
		},
        created() {
            this.getRecords()
        },
        methods: {
            getRecords() {
                var idArr = []
                this.$store.state.records.forEach(item => idArr.push(item.id))
                console.log(idArr)
                if (idArr.length <= 0) return
                this.records = this.$store.state.records
            },
			share(item) {
                this.$store.commit('addToShare', item)
			}
        }
	}
</script>

<style lang="scss" scoped>
	.record-container{
		background-color: #eee;
		overflow: hidden;
		padding-bottom: 50px;  /*防止拉不到最底部*/
	}
	.footer{
		min-height: 30px;
		padding: 0;
	}
	.button{
		width: 50%;
		margin: 0;
		border: 0;
		/*border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;*/
	}
	.divide{
		width: 1px;
		height: 20px;
		background-color: #ccc;
	}
</style>