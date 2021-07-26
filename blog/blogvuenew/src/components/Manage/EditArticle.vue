<template>
  <div class="editart">
    <ul class="list">
      <li>
        <h2>文章列表</h2>
        <h2>总计{{blogList.length}}篇</h2>
      </li>
      <li v-for="(v,index) in blogList" :key="index">
        <h2>{{v.title}}</h2>
        <div>
          <p @click="edit(v.id)">编辑</p>
          <p @click="delet(v.id)">删除</p>
          <p @click="manageMeg(v.id)">管理留言</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {Blog,delArt} from '../../api/index'
export default {
  inject: ['reload'],
  name: "EditArticle",
  created() {
    Blog(1000)
      .then((res)=>{
        if (res) {
          this.blogList = res.data;
          console.log(res);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data(){
    return{
      blogList:[],

    }
  },
  methods: {
    edit(id) {
      this.$router.push({ path: "/addart",query: { id: id}});
    },
    delet(id) {
      delArt(id)
      .then((res)=>{
        if (res) {
          console.log(res);
          if(res.code == '200'){
              this.$message({
                message: '删除文章成功',
                type: 'success',
                duration: 1000
              });
              this.reload();
            }else{
              this.$message({
                showClose: true,
                message: '删除文章失败',
                type: 'error',
                duration: 1000
              });
            }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    manageMeg(id){
      this.$router.push({path:"/editmeg",query: { id: id}});
    }
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/base.scss";
@import "../../assets/css/mixin.scss";
.list{
  
  padding: 10px;
  li{
    @include font_color();
    @include bg_color();
    width: 80%;
    height: 50px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    margin: 0 auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      width: 20%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    p:hover{
      color: rgb(182, 18, 18);
    }
  }
}
</style>
