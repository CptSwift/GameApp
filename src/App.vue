<template>
  <div class="app-container">
    <mt-header fixed title="游戏集中营">
    	<span @click="goBack" slot="left">
    		<mt-button icon="back">返回</mt-button>
    	</span>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>


    <nav class="mui-bar mui-bar-tab">
    	<router-link class="mui-tab-item-remake" to="/share">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">分享</span>
      </router-link>
      <router-link class="mui-tab-item-remake" to="/games">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">游戏</span>
      </router-link>
      <router-link class="mui-tab-item-remake" to="/record">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">记录</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
	export default{
		data(){
			return {
				flag: false
			}
		},
		created() {
			if(this.$route.path == '/games'){
				this.flag = false
			}
			else{
				this.flag = true
			}
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			}
		},
		watch:{
			'$route.path':function(newVal){
				if(newVal === "/games"){
					this.flag = false
				}
				else{
					this.flag = true
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
  .app-container{
    padding-top: 40px;
    overflow-x: hidden;
  }

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }

  .mui-bar-tab .mui-tab-item-remake.mui-active {
    color: #007aff;
  }

  .mui-bar-tab .mui-tab-item-remake{
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-item-remake .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-item-remake .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mint-header{
    z-index: 99;
  }

</style>
