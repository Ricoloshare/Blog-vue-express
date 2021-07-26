<template>
  <div class="emoji">
    <!-- 输入框区域 -->
    <div :class="faceShow ? 'box boxFaceShow' : 'box'" ref="heightFace">
      <textarea v-model="textArea" :placeholder="textConent"></textarea>
      <p class="faceBut" @click="faceContent">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-biaoqing"></use>
        </svg>
        表情</p>
    </div>
    <!-- 表情区域 -->
    <div class="browBox" v-if="faceShow">
      <ul>
        <li
          v-for="(item, index) in faceList"
          :key="index"
          @click="getBrow(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 导入JSON格式的表情库
const appData = require("@/assets/emojis.json");
export default {
  name: "Emoji",
  data() {
    return {
      textArea:'',
      faceList: [],
      faceShow: false,
      getBrowString: "",
      content: [],
    };
  },
  props:{
    textConent:{
      type:String,
      default:''
    }
  },
  methods: {
    // 表情
    faceContent() {
      this.faceShow = !this.faceShow;
      if (this.faceShow == true) {
        for (let i in appData) {
          this.faceList.push(appData[i].char);
        }
      } else {
        this.faceList = [];
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.textArea += this.getBrowString;
        }
      }
    },
    // 将input的内容渲染到页面上
    referContent() {
      if (this.textArea == "") return alert("请输入内容");
      // 存入
      this.content.push(this.textArea);
      // 清空input数据
      this.textArea = "";
      // 关闭表情列表
      this.faceShow = false;
    },
  }
};
</script>
<style scoped lang='scss'>
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.faceBut{
    cursor: pointer;
    @include font_color();
    padding: 10px 0;
    width: 60px;
}
.emoji{
    width: 100%;
    padding-top: 20px;
    @include font_color();
    @include bg_color();
}
textarea{
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #DCDFE6;
  background-color: rgb(255, 255, 255,0.4) !important;
  overflow: hidden;
  outline: 0;
  border-radius: 4px;
  resize: none;
  padding: 0 15px;
  padding-top: 5px;
  @include font_color();
}
textarea:focus{
  @include border_color();
}
textarea::-webkit-input-placeholder {
  color: #ccc;
  font-weight: bold;
  font-size: 12px;
}
.browBox {
  width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      li {
        width: 5%;
        font-size: 15px;
        list-style: none;
        text-align: center;
        cursor: pointer;
      }
    }
}
</style>
<style lang='scss'>
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>