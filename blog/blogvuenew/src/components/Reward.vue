<template>
  <div class="reward" @mouseover="mouseOver"
      @mouseleave="mouseLeave">
      <div class="button">
          赏
      </div>
      <div class="pic" v-if="isShow">
          <img :src="picUrl" alt="">
          <div class="imgcontent">
          <p>支付宝</p>
          <p>微信</p>
        </div>
      </div>
  </div>
</template>
<script>
import url from '../assets/images/money.png'
  export default {
    name: 'Reward',
    data() {
      return {
        picUrl: url,
        isShow:false
      }
    },
    methods:{
        mouseOver(){
            this.isShow = true
            console.log("hhh");
        },
        mouseLeave(){
            this.isShow = false
        }
    }
  };
</script>
<style lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.button{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    @include font_active_color();
    border: 1px solid #000;
    @include border_color();
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.pic img{
    margin-top: 10px;
    width: 350px;
}
.imgcontent{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  p{
    margin: 0;
  }
}
</style>