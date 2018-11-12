<template>
	<div class="record-container">
		<div class="mui-card" v-for="(item, i) in records" :key="item.id">
			<div class="mui-card-header">{{ item.name }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">{{ item.score }}</div>
			</div>
			<div class="mui-card-footer">{{ item.time }}</div>
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
                this.records = this.$store.state.records
                var idArr = []
                this.$store.state.records.forEach(item => idArr.push(item.id))
                console.log(idArr)
                if (idArr.length <= 0) return
                this.records = this.$store.state.records
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
</style>