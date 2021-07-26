<template>
  <div class="megbox">
    <div class="top">
      <Emoji ref="emoji" :textConent="rename"/>
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item prop="name" label="昵称" :rules="rules.name">
          <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :rules="rules.email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">啾</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h2>内容区</h2>
    <div class="bottom">
      <div class="block">
        <div class="timeline" v-for="(v, index) in list" :key="index">
          <p>
            <span>{{ v.megs.name }}</span
            >{{ v.megs.createdAt }}
          </p>
          <p class="content">{{ v.megs.content }}</p>
          <p class="reply" @click="replyMessage(index,v.megs.name)">回复</p>
          <div class="rep" v-for="(r, i) in v.reply" :key="i">
            <svg class="icon inicon" aria-hidden="true">
              <use xlink:href="#icon-duolaameng-" v-if="r.star == 0"></use>
              <use xlink:href="#icon-niunainaiping" v-if="r.star == 1"></use>
            </svg>
            <p>
              <span>{{ r.name }}</span
              >{{ r.createdAt }}
            </p>
            <p class="content">{{ r.content }}</p>
            <p class="reply" @click="replyMessage(index,r.name)">回复</p>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-niunainaiping" v-if="v.megs.star == 1"></use>
            <use xlink:href="#icon-duolaameng-" v-if="v.megs.star == 0"></use>
          </svg>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Emoji from "../components/Emoji";
import { addMessage, replyMessage } from "../api/index";
export default {
  data() {
    return {
      ruleForm: {},
      oneMeg: {
        type: 1,
        star: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      content: [],
      rename:'',
      uid:''
    };
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    type: {
      default: "1",
    },
    reindex:0,
  },
  methods: {
    onSubmit() {
      this.$refs.emoji.referContent();
      this.content = this.$refs.emoji.content;
      this.oneMeg.name = this.ruleForm.name;
      this.oneMeg.email = this.ruleForm.email;
      this.oneMeg.content = this.content[this.content.length - 1];
      this.oneMeg.type = this.type;
      // 添加留言
      if(this.rename == ''){
        addMessage(this.oneMeg)
        .then((res) => {
          if (res) {
            console.log(res);
            if (res.code == "200") {
              this.$message({
                message: "发布成功",
                type: "success",
                duration: 1000,
              });
              this.list.unshift({megs:this.oneMeg});
            } else {
              this.$message({
                showClose: true,
                message: "发布失败",
                type: "error",
                duration: 1000,
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          this.$message({
            showClose: true,
            message: "发布失败",
            type: "error",
            duration: 1000,
          });
        });
      }
      else{
        this.oneMeg.name += this.rename;
        this.oneMeg.uid = this.uid;
        console.log("回复",this.oneMeg);
        replyMessage(this.oneMeg)
        .then((res) => {
          if (res) {
            console.log(res);
            if (res.code == "200") {
              this.$message({
                message: "发布成功",
                type: "success",
                duration: 1000,
              });
              this.list[this.reindex].reply.push(this.oneMeg);
            } else {
              this.$message({
                showClose: true,
                message: "发布失败",
                type: "error",
                duration: 1000,
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          this.$message({
            showClose: true,
            message: "发布失败",
            type: "error",
            duration: 1000,
          });
        });
      }
    },
    replyMessage(i,name){
      this.rename = '';
      this.reindex = i;
      let n = name.split("@")[0];
      this.rename = `@${n}`;
      this.uid = this.list[i].megs.id;
    }
  },
  components: {
    Emoji,
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.megbox {
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  @include font_color();
  @include bg_color();
}
.top {
  margin-bottom: 20px;
}
.bottom {
  width: 100%;
  min-height: 600px;
  margin-top: 20px;
}
.timeline {
  width: 100%;
  padding-bottom: 10px;
  padding-left: 30px;
  position: relative;
  p {
    span {
      font-weight: bold;
      margin-right: 5px;
    }
  }
  .line {
    width: 1px;
    height: 100%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    left: 8px;
  }
  .icon {
    position: absolute;
    top: 0;
    left: -6px;
    z-index: 99;
    font-size: 30px;
    color: #000;
  }
  .reply {
    cursor: pointer;
    font-size: 12px;
    margin: 5px 0;
  }
  .rep {
    padding-left: 40px;
    position: relative;
    .inicon {
      position: absolute;
      top: 0;
      left: 0px;
      z-index: 99;
      font-size: 30px;
      color: #000;
    }
  }
}
.content{
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  // @include border_color();
}
</style>