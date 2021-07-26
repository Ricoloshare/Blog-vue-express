<template>
  <div class="Edit">
    <ManageHead/>
    <router-view/>
  </div>
</template>

<script>
import ManageHead from'../../components/Manage/ManageHead'
import { LoginCheck} from "../../api/index";
export default {
  name: "Edit",
  created(){
      LoginCheck(this.ruleForm)
      .then((res)=>{
        console.log(res);
        if (res.code != "200") {
          this.$router.push({ path: "/login" });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods:{
  },
  components:{
    ManageHead
  }
};
</script>
<style scoped lang="scss">

</style>