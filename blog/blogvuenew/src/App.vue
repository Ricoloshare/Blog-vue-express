<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Blog from "@/views/Blog.vue";
import { mapGetters } from 'vuex'
export default {
  name: "App",
  components: {
    Blog,
  },
  provide(){
    return {
      reload: this.reload
    }
  },
   
  data(){
    return {
      isReload:true,
    }
  },
  mounted(){
        document.getElementById('app').style.display = 'block';
        document.getElementById('appLoading').style.display = 'none';
  },
  methods:{
    reload(){
      this.isReload = false;
      this.$nextTick(()=>{
        this.isReload = true;
      });
    }
  }
};
</script>
<style lang="scss">
@import "./assets/css/base.scss";
@import "./assets/css/mixin.scss";
@import './assets/font/iconfont.css';
#app{
  width: 100%;
  @include bg_app_color();
}
</style>
<style>
#app{
  width: 100%;
  height: 100%;
}
</style>