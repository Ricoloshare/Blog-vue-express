<template>
  <div class="addart">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请填写标题"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-select v-model="ruleForm.classify" placeholder="请填写分类">
          <el-option
            v-for="(v, i) in getClassifies"
            :key="i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="img">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://ricolo.cn/api/api/blog/editart/img"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :auto-upload="true"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <img :src="url" alt="" id="imgs" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="ruleForm.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addArt, getArt, editArt } from "../../api/index";
import { mapGetters } from "vuex";
import { highlightCode } from "../../main";
export default {
  name: "CreateArt",
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    if (this.id) {
      this.isShow = false;
      getArt(this.id)
        .then((res) => {
          if (res) {
            this.ruleForm = res.data[0];
            console.log(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "getClassifies",
      // ...
    ]),
  },
  data() {
    return {
      id: "",
      content: "",
      ruleForm: {
        img: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 255,
            message: "长度在 3 到 255 个字符",
            trigger: "blur",
          },
        ],
        author: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        classify: [
          { required: true, message: "请输入分类", trigger: "change" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      url: "",
      isShow: true,
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.img);
          if (this.ruleForm.img == "") {
            let pic = 1 + parseInt(Math.random() * 6);
            this.ruleForm.img = `http://ricolo.cn/api/image/${pic}.jpg`;
          }
          if (this.$route.query.id) {
            editArt(this.ruleForm)
              .then((res) => {
                if (res.code == "200") {
                  this.$message({
                    message: "修改文章成功",
                    type: "success",
                    duration: 500,
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: "无法修改文章",
                    type: "error",
                    duration: 500,
                  });
                }
                this.$router.push({ path: "/editart" });
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log(this.ruleForm);
            addArt(this.ruleForm)
              .then((res) => {
                console.log(res);
                if (res.code == "200") {
                  this.$message({
                    message: "添加文章成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.push({ path: "/editart" });
                } else {
                  this.$message({
                    showClose: true,
                    message: "无法添加文章",
                    type: "error",
                    duration: 1000,
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      });
      this.$refs.upload.submit();
    },
    resetForm(formName) {
      if (this.id) {
        this.$router.push({ path: "/editart" });
      }
      this.$refs[formName].resetFields();
    },
    handleSuccess(res) {
      this.ruleForm.img = res;
      if (this.ruleForm.img.url) {
        this.url = `http://ricolo.cn/api/${this.ruleForm.img.url}`;
        this.isShow = false;
        this.ruleForm.img = this.url;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      console.log(this.fileList);
    },
  },
  mounted() {
    highlightCode();
  },

  updated() {
    highlightCode();
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/base.scss";
@import "../../assets/css/mixin.scss";
.addart {
  padding-right: 20px;
  padding-top: 20px;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  @include font_color();
  @include bg_color();
}
#imgs {
  width: 200px;
  height: 150px;
}
</style>