<template>
	<div style="width: width; height: 30px; border: 1px solid black;">
		<h3>SCORE: {{ score }}</h3>
	</div>
</template>

<script>
	export default {
		props: [
			"score"
		],
		computed: {
			width() {
        		let screen_w = document.documentElement.clientWidth || document.body.clientWidth
        		return `${ screen_w }px`
			}
		}
	}
</script>

<style>
</style>