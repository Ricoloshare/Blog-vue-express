<template>
  <div class="summery">
    <el-card class="box-card content-card" v-for="(v,i) in list" :key="i">
      <div class="info-top">
        <img class="info-img" :src="v.img" alt="">
        <div class="content">
          <h2 @click="getDetail(v.id)">{{v.title}}</h2>
          <p>
            {{v.description}}
          </p>
        </div>
      </div>
      <div class="info-bottom">
        <ul>
          <li>
            <i class="el-icon-user-solid"></i>
            <p>{{v.author}}</p>
          </li>
          <li>
            <i class="el-icon-date"></i>
            <p>{{v.createdAt}}</p>
          </li>
          <li>
            <i class="el-icon-view"></i>
            <p>{{v.views}}</p>
          </li>
        </ul>
        <p class="label">{{v.classify}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import logoUrl from "./../assets/images/logo.jpg";
export default {
  name: "Summery",
  data() {
    return {
      logoImg: logoUrl,
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods:{
    getDetail(id){
      console.log("jjjjj");
      this.$router.push({path:'/detail',query: {id: id}})
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.summery{
    width: 100%;
    height: 100%;
}
.info-top {
  margin-bottom: 20px;
  .info-img{
    width: 300px;
    height: 150px;
  }
  .content {
    margin-left: 20px;
    h2 {
      cursor: pointer;
      font-size: $font_Vlarge;
      margin-bottom: 10px;
      @include clamp(2);
    }
    p {
      @include clamp(4);
    }
  }
}
.info-top,
.info-bottom,
.info-bottom ul,
.info-bottom ul li {
  display: flex;
  align-items: center;
}
.info-bottom {
  justify-content: space-between;
  .label {
    border: 1px solid #000;
    padding: 1px 5px;
    border-radius: 5px;
    @include border-color();
    @include font_color();
    cursor: pointer;
  }
}
.info-bottom ul li i,
.info-bottom ul li {
  margin-right: 5px;
}
.box-card {
  width: 100%;
  margin-bottom: 15px;
  @include font_color();
  @include bg_color();
}

.content-card:hover {
  border-right: 8px solid #000;
  border-left: 8px solid #000;
  @include border_color();
}
@media screen and (max-width: 750px) {
  .info-top img{
    display: none;
  }
  .info-bottom .label{
    display: none;
  }
  .info-top .content{
    margin: 0;
  }
  .info-bottom ul li:nth-child(1){
    display: none;
  }
   .info-bottom ul{
     width: 100%;
     justify-content: space-between;
   }
}
</style>


<style lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.el-card__header {
  @include border_color();
}
// .el-pagination{
//   @include pagination_color();
// }
</style>