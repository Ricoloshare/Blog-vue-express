<template>
  <div class="life">
    <div class="top">
      <Emoji ref="emoji"/>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <Life/>
    </div>
  </div>
</template>

<script>
import Emoji from '../../components/Emoji'
import Life from '../../views/Life'
import {addOneLife} from '../../api/index'
export default {
  data() {
    return {
       content:[]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs.emoji.referContent();
      this.content = this.$refs.emoji.content;
      console.log(this.$refs.emoji.content);
      addOneLife({content:this.content[this.content.length - 1]})
        .then(res=>{
        this.content = res.data;
        if (res.code == "200") {
          this.$message({
            message: "添加点滴成功",
            type: "success",
            duration: 1000,
          });
          this.$router.push({ path: "/Life" });
        } else {
          this.$message({
            showClose: true,
            message: "无法添加点滴",
            type: "error",
            duration: 1000,
          });
        }
      })
      .catch(e=> {
        this.$message({
          showClose: true,
          message: "无法添加文章",
          type: "error",
          duration: 1000,
        });
      })
    },
  },
  components: {
    Emoji,
    Life
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/css/base.scss";
@import "../../assets/css/mixin.scss";
.life{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  @include font_color();
  @include bg_color();
}
.top{
  margin-bottom: 20px;
}
.bottom{
  width: 100%;
  height: 600px;
  margin-top: 20px;
}
.timeline{
  width: 100%;
  padding-bottom: 10px;
  padding-left: 30px;
  position: relative;
  p{
    span{
      font-weight: bold;
      margin-right: 5px;
    }
  }
  .line{
    width: 1px;
    height: 100%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    left: 8px;
  }
  .icon{
    position: absolute;
    top: 0;
    left: -6px;
    z-index: 99;
    font-size: 30px;
    color: #000;
  }
  .reply{
    cursor: pointer;
    font-size: 12px;
    margin: 5px 0;
  }
  .rep{
      padding-left: 40px;
      position: relative;
      .inicon{
        position: absolute;
        top: 0;
        left: 0px;
        z-index: 99;
        font-size: 30px;
        color: #000;
      }
    }
}
</style>