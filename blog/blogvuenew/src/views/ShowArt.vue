<template>
  <div class="show animate__animated animate__bounceIn">
    <div class="detail">
      <article class="markdown-body">
        <div class="title">
          <h1>{{ art.title }}</h1>
          <ul>
            <li>
              <i class="el-icon-user-solid"></i>
              <p>{{ art.author }}</p>
            </li>
            <li>
              <i class="el-icon-date"></i>
              <p>{{ art.updatedAt }}</p>
            </li>
            <li>
              <i class="el-icon-view"></i>
              <p>{{ art.views }}</p>
            </li>
            <li>
              <i class="el-icon-s-management"></i>
              <p>{{ art.classify }}</p>
            </li>
          </ul>
        </div>
        <div v-html="content"></div>
      </article>
      <div class="reward">
        <Reward></Reward>
      </div>
      <h1>评论区</h1>
      <MegBox :list="megContent" :type="id" />
    </div>
  </div>
</template>

<script>
import MegBox from "../components/MegBox";
import Reward from "../components/Reward";
import { getArt, getMessage } from "../api/index";
import {highlightCode} from "../main"
export default {
  data() {
    return {
      art: {},
      content: "",
      megContent: [],
      id: "",
    };
  },
  components: {
    MegBox,
    Reward
  },
  created() {
    this.id = this.$route.query.id;
    getArt(this.id)
      .then((data) => {
        this.art = data.data[0];
        var MarkdownIt = require("markdown-it"),
          md = new MarkdownIt();
        this.content = md.render(this.art.content);
        console.log("文章：",this.art);
        
      })
      .catch((e) => {
        console.log(e);
      });
    getMessage(this.id)
      .then((res) => {
        console.log(res);
        this.megContent = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    highlightCode();
    
  },
  updated() {
    highlightCode();
  },
};
</script>
<style lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";

.show {
  width: 100%;
  height: auto;
  margin-top: 20px;
}
.detail {
  width: 80%;
  min-height: 300px;
  margin: 0 auto;
  @include font_color();
  @include bg_color();
  padding: 10px;
  position: relative;
  .title {
    margin-bottom: 10px;
    ul {
      width: 400px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        p {
          margin: 0;
          margin-left: 5px;
        }
      }
    }
    h1 {
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border: none;
    }
  }
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  @include font_color();
  font-size: 15px;
  h2 {
    border: none;
  }
}
.markdown-body pre,
code {
  @include bg_app_color();
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 10px;
  }
  .detail .title ul{
    display: block;
  }
  .detail{
    width: 95%;
  }
}
.reward {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 10px;
}
.judge {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -20px;
  padding-left: 10px;
  @include font_color();
  @include bg_color();
}
</style>
