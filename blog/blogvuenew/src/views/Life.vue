<template>
  <div class="life animate__animated animate__bounceIn">
    <div class="top">
      <img class="logo" :src="logoUrl" alt="">
      <p>这是Ricolo碎碎念的地方</p>
      <p>相当于第二个朋友圈吧</p>
      <p>记录一些琐碎</p>
      <p>😆😆😆😆😆😆</p>
    </div>
    <div class="bottom">
      <div class="timeline" v-for="(v,i) in content" :key="i">
        <el-card class="box-card">
        <p>{{v.content}}</p>
        <p class="name">— Ricolo {{v.updatedAt}}</p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-niunainaiping"></use>
        </svg>
        </el-card>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getLifes} from '../api/index'
import logoUrl from "./../assets/images/logo.jpg";
export default {
  data() {
    return {
      content:[],
      logoUrl:logoUrl
    };
  },
  created(){
    getLifes()
      .then(res=>{
        console.log(res);
        this.content = res.data;
      })
      .catch(e=> {console.log(e);})
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.life{
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
}
.box-card {
  @include font_color();
  @include bg_color();
}
.el-divider__text{
  @include font_color();
  @include bg_color();
}
.bottom{
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
  .name{
    text-align: right;
    margin-top: 20px;
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
.top{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    p{
      margin-bottom: 10px;
    }
    .logo{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-bottom: 10px;
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
</style>