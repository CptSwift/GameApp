<template>
    <div class="share-container">
        <share_card v-for="(item, i) in shares" :key="item.time" :share="item"></share_card>
    </div>
</template>

<script>
    import share_card from '@/components/subcomponents/share_card.vue'
    export default {
        data() {
            return {
                shares: []
            }
        },
        created() {
            this.getShares()
        },
        components: {
            share_card
        },
        methods: {
            getShares() {
                var idArr = []
                this.$store.state.shares.forEach(item => idArr.push(item.id))
                console.log(idArr)
                if (idArr.length <= 0) return
                this.shares = this.$store.state.shares
            }
        }
    }
</script>

<style>
</style>