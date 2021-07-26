<template>
  <div class="about animate__animated animate__jackInTheBox">
    <div class="box-card me">
      <img class="avater" :src="logoImg" alt="" />
      <h1>Ricolo</h1>
      <p>敲代码敲到世界充满爱</p>
      <ul>
        <li @mouseenter="mouseenter(1)" @mouseleave="mouseleave()">
          <i class="iconfont icon-shejiao-QQ"></i>
          <div class="iconurl" v-if="isShow == 1">
            <img :src="iconUrl[0]" alt="">
            <div class="arrow"></div>
          </div>
        </li> 
        <li @mouseenter="mouseenter(2)" @mouseleave="mouseleave()">
          <i class="iconfont icon-shejiao-weixin"></i>
          <div class="iconurl" v-if="isShow == 2">
            <img :src="iconUrl[1]" alt="">
            <div class="arrow"></div>
          </div>
        </li>
        <li @mouseenter="mouseenter(3)" @mouseleave="mouseleave()">
          <i class="iconfont icon-shejiao-youxiang"></i>
        </li>
        <li @mouseenter="mouseenter(4)" @mouseleave="mouseleave()" @click="gotogithib">
          <i class="iconfont icon-github"></i>
        </li>
      </ul>
      
    </div>
    <el-divider>网站简介</el-divider>
    <article>
      <h2>网站信息：(点击导航栏两边空白处可以换肤哦~)</h2>
      <p>前后分离</p>
      <p>前端：  基于Vue 2.x，前端UI少数用的Element（害，太丑了)，大多数自己手敲，动画为Animation.css</p>
      <p>后端：  基于Nodejs(express)</p>
      <p>数据库：MySQL</p>
      <p>服务器是腾讯云购买，域名是阿里云购买，哈哈哈哈哈</p>
      <p>服务器Linux下安装的宝塔面板，坑好多</p>
      <br>
      <h2>搭建初衷：</h2>
      <p>1. 想拥有一个属于自己的网站</p>
      <p>2. 迫使自己总结知识，好好学习，记录学习中所遇到的问题</p>
      <p>3. 看到很多大佬的网站都很好看，想拥有。</p>
    </article>
    <el-divider>个人简介</el-divider>
    <article>
      <p>95后</p>
      <p>坐标：江苏</p>
      <p>颜狗，喜欢科技感强的东东</p>
      <p>喜欢出去浪</p>
      <br>
      <p>心有猛虎，细嗅蔷薇</p>
      <p>世界和我爱着你</p>
    </article>
    <el-divider>求投喂</el-divider>
    <div class="food">
      <img class="cat" :src="catUrl" alt="">
      <div class="qr">
        <p>喵~ ~ 如果你喜欢我，或者喜欢本站的内容，赏点喵粮吧~</p>
        <img :src="mUrl" alt=""> 
        <div class="imgcontent">
          <p>支付宝</p>
          <p>微信</p>
        </div>
        <div class="left-arrow"></div>
      </div>
    </div>
  </div>
</template>
<script>
import logoUrl from "./../assets/images/logo.jpg";
import catUrl from "./../assets/images/catlogo.jpg";
import QQUrl from "./../assets/images/qq.jpg";
import vkUrl from "./../assets/images/vk.png";
import mUrl from '../assets/images/money.png'
import Summary from '../components/Summary'
import {Blog} from '../api/index'
export default {
  data() {
    return {
      logoImg: logoUrl,
      catUrl:catUrl,
      mUrl: mUrl,
      blogList:[],
      iconUrl:[QQUrl,vkUrl],
      isShow: 0,
    }
  },
  name: "About",
  components: {
    Summary,
  },
  methods:{
    mouseenter(num){
      this.isShow = num;
    },
    mouseleave(){
      this.isShow = 0;
    },
    gotogithib(){
      window.open("https://github.com/Ricoloshare/TFIDF", '_blank');
    }
  },
  created(){
    Blog()
      .then(res=>{
        this.blogList = res.data;
        console.log(this.blogList)
      })
      .catch(e=> {console.log(e);})
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.about {
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
  .me {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    h1{
      margin: 5px 0;
      font-weight: bold;
      font-size: 25px;
    }
    ul{
      width: 200px;
      display: flex;
      justify-content: space-around;
      margin: 15px 0;
      li{
        position: relative;
      }
      li i{
        font-size: 25px;
        cursor: pointer;
      }
      li:hover i{
        @include font_active_color();
      }
    }
    .iconurl{
      width:115px;
      height:115px;
      padding: 5px;
      box-sizing: border-box;
      position:absolute; 
      top: 40px;
      left: -15px;
      border:2px solid red;
      @include border_color();
      background-color:$border-color-theme1;
      border-radius:8px;
      z-index: 99999;
      img{
        width: 100px;
      }
      .arrow{
        width:0;
        height:0;
        border:8px solid transparent;
        border-bottom-color: $border-color-theme1;
        position: absolute;
        top: -18px;
        left:15%;
      }
    }
  }
  .me .avater{
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .food{
    display: flex;
    justify-content: space-around;
    // align-items: center;
    margin-top: 20px;
    .qr{
      width: 60%;
      padding: 20px;
      position: relative;
      img{
        width: 100%;
      }
      p{
        margin-bottom: 10px;
        color: #000;
      }
      background-color:$border-color-theme1;
      .left-arrow{
        width:0;
        height:0;
        border:30px solid transparent;
        border-right-color:$border-color-theme1;
        position: absolute;
        top: 20px;
        left:-60px;
      }
    }
    .cat{
      width: 200px;
      height: 200px;
      border-radius: 50%;
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
  }
  
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
article{
  margin: 20px 0;
  h1,h2{
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.intro{
  margin-top: 20px;
}
.box-card {
  width: 100%;
  margin-bottom: 15px;
  @include font_color();
  @include bg_color();
}

@media screen and (max-width: 750px) {
  .about .food .cat{
    display: none;
  }
  .about .food .qr{
    width: 90%;
  }
  .about .food .qr .left-arrow{
    display: none;
  }
  .about .food{
    flex-direction: column;
    align-items: center;
  }
}
</style>

