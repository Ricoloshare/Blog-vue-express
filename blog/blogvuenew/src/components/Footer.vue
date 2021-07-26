<template>
  <div class="footer">
    <div class="bottom">
      <p>Copyright©2021-2022 Ricolo Design By LK</p>
      <p><a href="https://beian.miit.gov.cn/">苏ICP备2021006159号</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped lang="scss">
@import "../assets/css/base.scss";
@import "../assets/css/mixin.scss";
.footer {
  width: 100%;
  padding: 0 5%;
  @include font_color();
  @include bg_color();
  box-sizing: border-box;
  margin-top: 20px;
  .bottom{
      box-sizing: border-box;
      width: 100%;
      height: 32%;
      padding:10px 0;
      text-align: center;
  }
  p a{
    @include font_color();
  }
}
</style>
