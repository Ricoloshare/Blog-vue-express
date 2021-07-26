<template>
  <div class="mesg animate__animated animate__fadeInLeft">
      <img :src="megUrl" alt="">
      <h2>欢迎大佬留言、吐槽、提问、灌水，杜绝广告！</h2>
    <MegBox :list="content" :type="1" />
  </div>
</template>

<script>
import {getMessage} from "../api/index";
import megUrl from "../assets/images/meg.gif";
import MegBox from "../components/MegBox";
export default {
  name: "Message",
  data() {
    return {
      content: [],
      megUrl:megUrl
    };
  },
  components: {
    MegBox,
  },
  created() {
    getMessage(1)
      .then(res=>{
        console.log(res);
        this.content = res.data;
      })
      .catch(e=> {console.log(e);})
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.mesg {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #EBEEF5;
  @include font_color();
  @include bg_color();
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 200px;
  }
  h2{
    font-size: 20px;
    font-weight: bold;
  }
}
</style>