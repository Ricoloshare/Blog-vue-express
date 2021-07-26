<template>
<div class="wrapp">
 <div class="login">
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div> 
</div>

</template>
<script>
import { Login, Blog } from "../../api/index";
export default {
  data() {
    var checkAccout = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        accout: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAccout, trigger: "blur" }],
      },
    };
  },
  created() {
    Blog()
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Login(this.ruleForm)
            .then((res)=>{
                console.log(res);
              if (res.code == '200') {
                alert("登录成功");
                this.$router.push({ path: "/edit" });
              } else {
                alert("登录失败");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/base.scss";
@import "../../assets/css/mixin.scss";
.login{
  width: 30%;
  min-width: 350px;
  height: 300px;
  margin: 10px auto;
  margin-top: 100px;
  
}
.wrapp{
  width: 100%;
  height: 100%;
  // background-color: rgb(14, 13, 13);
  overflow: hidden;
}
</style>