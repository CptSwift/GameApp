<template>
	<div>
		<div class="mui-card" v-for="(item, i) in records" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="info">
						<h1>{{ item.name }}</h1>
						<h1>{{ item.score }}</h1>
					</div>
				</div>
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

<style>
</style>