<template>
  <div class="header" @click="changeTheme">
    <div class="ricolo">
      <router-link class="router_link" tag="p" to="/">Ricolo</router-link>
    </div>
    <div class="nav">
      <div
        v-for="(v, k) in navigation"
        :key="k"
        :class="['router_link', activeId == k ? 'active' : '']"
        @click.stop="addClass(k)"
      >
        <span :class="icons[k]"></span>
        <p>{{ v }}</p>
      </div>
    </div>

    <div class="search" @click.stop="">
      <el-input placeholder="请输入搜索内容" v-model="inputd">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      inputd: "",
      activeId: "home",
      navigation: {
        home: "网站首页",
        Articles: "文章专栏",
        Life: "记录点滴",
        // "Resources":"资源分享",
        mesg: "留言栏",
        about: "关于",
      },
      icons: {
        home: "el-icon-house",
        Articles: "el-icon-reading",
        Life: "el-icon-edit",
        Resources: "el-icon-link",
        mesg: "el-icon-chat-line-square",
        about: "el-icon-warning-outline",
      },
      theme: 1,
    };
  },
  methods: {
    addClass(id) {
      this.activeId = id;
      this.$router.push({ path: "/" + id });
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
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.header {
  width: 100%;
  height: 10%;
  min-height: 40px;
  max-height: 60px;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px #333;
  @include font_color();
  @include bg_color();
  .router_link {
    min-height: 40px;
    max-height: 60px;
    cursor: pointer;
  }
  .ricolo {
    font-weight: bold;
    @include font_color();
    font-size: 30px;
  }
  .nav {
    width: 70%;
    height: 100%;
    display: flex;
    .active {
      @include font_active_color();
      border-bottom: 3px solid;
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
  .search {
    position: relative;
    input[type="text"] {
      border-radius: 5px;
      border: none;
      background-color: #3cbc8d;
      color: white;
    }
  }
}
</style>
<style lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.el-input__inner {
  @include font_color();
  background-color: rgb(255, 255, 255, 0.4) !important;
}
.el-button--primary {
  @include font_color();
  background-color: rgb(255, 255, 255, 0.4) !important;
  @include border_color();
}
.el-button--primary:hover {
  @include font_active_color();
  @include border_color();
}
.el-form-item__label {
  @include font_color();
}
.el-input .is-active .el-input__inner,
.el-input__inner:focus,
.el-textarea__inner:focus {
  @include border_color();
}
.el-textarea__inner {
  height: 80px;
  background-color: rgb(255, 255, 255, 0.4) !important;
  overflow: hidden;
  @include font_color();
}
.el-divider__text {
  @include font_color();
  @include bg_color();
}
.el-form-item__content {
  margin-bottom: 8px;
}
.el-menu-demo,
.el-menu-demo li {
  background-color: #333 !important;
}

@media screen and (max-width: 750px) {
  .search,
  .ricolo {
    display: none;
  }
  .header .nav {
    width: 100% !important;
    justify-content: space-between;
    align-items: center;
    p {
      display: none;
    }
  }
}
</style>