<template>
	<div class="container" style="width: width;">
		<h3>SCORE: {{ score }}</h3>
		<h3>HIGH SCORE: {{ high_score }}</h3>
	</div>
</template>

<script>
	export default {
		props: ['score', 'high_score'],
		computed: {
			width() {
        		let screen_w = document.documentElement.clientWidth || document.body.clientWidth
        		return `${ screen_w }px`
			}
		}
	}
</script>

<style scoped>
	.container {
		height: 30px;
		border: 1px solid black;
		display: flex;
		justify-content: space-between;
	}
</style>