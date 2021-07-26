<template>
  <div class="editmeg">
    <Emoji ref="emoji" :textConent="rename" />
    <button @click="onSubmit">提交</button>
    <div class="bottom">
      <div class="block">
        <div class="timeline" v-for="(v, index) in list" :key="index">
          <p>
            <span>{{ v.megs.name }}</span
            >{{ v.megs.createdAt }}
          </p>
          <p class="content">{{ v.megs.content }}</p>
          <div class="del_re">
            <p class="reply" @click="replyMessage(index, v.megs.name)">回复</p>
            <p class="reply" @click="delMessage(v.megs.id)">删除</p>
          </div>
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
            <div class="del_re">
              <p class="reply" @click="replyMessage(index, r.name)">回复</p>
              <p class="reply" @click="delreply(r.id)">删除</p>
            </div>
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
import {
  getMessage,
  addMessage,
  replyMessage,
  delReply,
  delMeg,
} from "../../api/index";
import Emoji from "../Emoji";

export default {
  name: "EditMeg",
  data() {
    return {
      list: [],
      rename: "",
      type: 1,
      oneMeg: {
        type: 1,
        star: 1,
        name: "Ricolo",
        email: "81006349@qq.com",
      },
      uid: "",
      reindex: 0,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.emoji.referContent();
      this.content = this.$refs.emoji.content;
      this.oneMeg.content = this.content[this.content.length - 1];
      this.oneMeg.type = this.type;
      // 添加留言
      if (this.rename == "") {
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
                this.list.unshift({ megs: this.oneMeg });
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
      } else {
        this.oneMeg.name += this.rename;
        this.oneMeg.uid = this.uid;
        console.log("回复", this.oneMeg);
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
    replyMessage(i, name) {
      console.log(i);
      this.rename = "";
      this.reindex = i;
      let n = name.split("@")[0];
      this.rename = `@${n}`;
      this.uid = this.list[i].megs.id;
    },
    delMessage(id) {
      delMeg(id)
        .then((res) => {
          if (res) {
            if (res.code == "200") {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1000,
              });
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
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
            message: "删除失败",
            type: "error",
            duration: 1000,
          });
        });
    },
    delreply(id) {
      delReply(id)
        .then((res) => {
          if (res) {
            if (res.code == "200") {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1000,
              });
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
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
            message: "删除失败",
            type: "error",
            duration: 1000,
          });
        });
    },
  },
  components: {
    Emoji,
  },
  created() {
    if (this.$route.query.id) this.type = this.$route.query.id;
    getMessage(this.type)
      .then((res) => {
        console.log(res);
        this.list = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/base.scss";
@import "../../assets/css/mixin.scss";
.editmeg {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  @include font_color();
  @include bg_color();
}
.del_re {
  display: flex;
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
    margin: 5px 5px;
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
.content {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  // @include border_color();
}
</style>
