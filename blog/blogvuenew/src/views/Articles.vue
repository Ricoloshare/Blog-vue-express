<template>
  <div class="articles animate__animated animate__jackInTheBox">
    <ul class="top">
        <li :class="{'active':isActive== -1}" @click="getarts(-1)">显示全部</li>
        <li :class="{'active':isActive== i}" v-for="(v,i) in getClassifies" :key="i" @click="getarts(i)">{{v}}</li>
    </ul>
    <h1 v-if="blogList.length == 0">该分类暂无</h1>
    <Summary :list="blogList"/>
  </div>
</template>

<script>
import Summary from "../components/Summary.vue";
import {Blog, getClassify} from '../api/index'
import { mapGetters } from 'vuex'
export default {
  name: "Blog",
  components: {
    Summary,
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getClassifies',
      // ... 
  ])},
  created(){
    Blog(100)
      .then(res=>{
        this.blogList = res.data;
        this.blogs = this.blogList;
        console.log(this.blogList)
      })
      .catch(e=> {console.log(e);})
  },
  data(){
    return{
      blogList:[],
      blogs:[],
      classifys:[],
      isActive: -1
    }
  },
  methods:{
    getarts(index){
      this.isActive = index;
      if(index != -1){
        let classify = this.getClassifies[index];
        getClassify(classify)
        .then(res=>{
          this.blogList = res.data;
          console.log(this.blogList)
        })
        .catch(e=> {console.log(e);})
      }else{
        this.blogList = this.blogs;
      }
      
    },

  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.articles{
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
.active{
  @include font_active_color();
}
h1{
  margin: 20px auto;
  font-size: 20px;
  padding: 20px;
  border-radius: 10px;
  @include font_color();
  @include bg_color();
}
.top{
  width: 100%;
  height: 180px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  @include font_color();
  @include bg_color();
  li{
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 5px;
    border: 1px solid #000;
    @include border_color();
    margin-left: 20px;
  }
  li:hover{
    @include font_active_color();
  }
}

</style>