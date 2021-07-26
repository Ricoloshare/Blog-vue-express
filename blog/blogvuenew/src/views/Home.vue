<template>
  <div class="home">
    <!-- <div class="home_top">
    </div> -->
    <div class="home_bottom">
      <div class="info_left animate__animated animate__zoomInDown">
        <el-card class="box-card me">
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
        <el-divider>简介</el-divider>
        <div class="intro">
          <p>一枚学渣，努力学习中</p>
          <p>一枚学渣，努力学习中</p>
          <p>一枚学渣，努力学习中</p>
          <p>用0和1去理解这个世界</p>
          <p>一枚学渣，努力学习中</p>
        </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热门文章</span>
          </div>
            <a class="text item sb" v-for="(v,i) in hotblogList" :key="i" @click="gotoDetail(v.id)">
              <span class="biao red">{{i+1}}</span>
              <p>{{v.title}}</p>
              <div class="red views"><i class="el-icon-view"></i>{{v.views}}</div>
            </a>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>网站信息</span>
          </div>
            <div class="text item" >文章总数：<span class="red">{{blogList.length}}</span> 篇</div>
            <div class="text item">分类总数：<span class="red">{{getClassifies.length}}</span> 个</div>
            <div class="text item">网站运行天数：<span class="red">{{days}}</span>天</div>
        </el-card>
      </div>
      <div class="info_right animate__animated animate__zoomInRight">
        <Summary :list="blogList"/>
        <!-- <el-pagination background="flase" layout="prev, pager, next" :total="1000">
        </el-pagination> -->
      </div>
    </div>
    
  </div>
</template>

<script>
import logoUrl from "./../assets/images/logo.jpg";
import QQUrl from "./../assets/images/qq.jpg";
import vkUrl from "./../assets/images/vk.png";
import Summary from '../components/Summary'
import {Blog,HotBlog} from '../api/index'
import { mapGetters } from 'vuex'

export default {
  name: "Home",
  data() {
    return {
      logoImg: logoUrl,
      blogList:[],
      hotblogList:[],
      iconUrl:[QQUrl,vkUrl],
      isShow: 0,
      days: 1,
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getClassifies',
      // ... 
  ])},
  components: {
    Summary
  },
  methods:{
    mouseenter(num){
      this.isShow = num;
    },
    mouseleave(){
      this.isShow = 0;
    },
    gotogithib(){
      window.open("https://github.com/Ricoloshare/", '_blank');
    },
    gotoDetail(id){
      this.$router.push({ path: "/detail",query: { id: id}});
    }
  },
  created(){ 
    HotBlog()
      .then(res=>{
        this.hotblogList = res.data;
        console.log("文章：",res)
      })
      .catch(e=> {console.log(e);})
    Blog(10)
      .then(res=>{
        this.blogList = res.data;
        console.log("文章：",res)
      })
      .catch(e=> {console.log(e);})
  },
  mounted(){
    let a1 = Date.parse(new Date("2021/1/30"));
    let a2 = Date.parse(new Date());
    let day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    this.days = day;
    
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.home {
  width: 100%;
  // height: auto;
  // overflow-y: scroll;
  .home_top {
    width: 100%;
    height: 30%;
    img {
      width: 100%;
      height: 300px;
    }
  }
  .home_bottom {
    width: 80%;
    // height: 70%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .info_right {
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .info_left {
      width: 27%;
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
      .me .avater {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }
  }
}
.sb{
  justify-content: space-between;
  cursor: pointer;
}
.text {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
  span{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    border-radius: 5px;
    border: 1px solid #000;
    @include border_color();
  }
  p{
    @include clamp(1);
    margin-right: 5px;
    width: 80%;
    height: 20px;
    line-height: 20px;
  }
  div{
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      margin-right: 5px;
    }
  }
}
.red{
  @include font_active_color();
  font-weight: bold;
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
.box-card:hover{
  @include border_color();
}
.el-divider__text{
  @include font_color();
  @include bg_color();
}

@media screen and (max-width: 750px) {
  .home .home_bottom{
    flex-direction: column;
  }
  .home .home_bottom .info_left{
    width: 100%;
  }
  .home .home_bottom .info_right{
    display: none;
  }
}
</style>
