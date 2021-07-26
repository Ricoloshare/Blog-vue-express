<template>
  <div class="header" @click="changeTheme">
      <div class="nav">
      <div v-for="(v,k) in navigation" :key="k" :class="['router_link',activeId == k?'active':'']" @click.stop="addClass(k)">
          <p>{{v}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputd: '',
      activeId: 'addart',
      navigation:{
        "addart":"写文章",
        "editart":"编辑文章",
        "editlife":"编辑点滴",
        "editmeg":"留言板",
        "blog":"😍Enter😍博客😍",
      },
      theme: 1
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log("hhhhhhhhhhaaaaa"+key == "blog")
    //   if(key+"" != "blog"){
    //     this.$router.push({ path: "/" + key });
    //   }else{
    //     this.$router.push({ path: "/"});
    //   } 
      
    // },
    addClass(id){
      this.activeId = id;
      if(this.activeId != "blog")
        this.$router.push({path:'/'+id})
      else
        this.$router.push({path:'/'})
      console.log(this.activeId);
    },
    changeTheme() {
      this.theme++;
      if (this.theme >= 2) this.theme = 0;
      switch (this.theme) {
        case 0:
          document.documentElement.setAttribute("data-theme", "theme");
          break;
        case 1:
          document.documentElement.setAttribute("data-theme", "theme1");
          break;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/base.scss";
@import "../../assets/css/mixin.scss";
.header {
  width: 100%;
  height: 60px;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px #333;
  @include font_color();
  @include bg_color();
  .router_link {
    cursor: pointer;
  }
  .nav {
    width: 70%;
    height: 100%;
    display: flex;
    .active {
      @include font_active_color();
      border-bottom: 3px solid ;
      @include border_color();
    }
    .router_link {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 60px;
      width: 20%;
      height: 100%;
      span {
        margin-right: 5px;
      }
    }
    .router_link:hover {
      @include font_active_color();
      border-bottom: 3px solid;
      @include border_color();
    }
  }
}
</style>