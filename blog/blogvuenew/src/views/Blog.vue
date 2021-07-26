<template >
  <div id="blog" >
    <Scrollview ref="scrollviews">
      <div class="wrapp">
        <Header />
        <router-view />
        <Footer />
      </div>
    </Scrollview>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Scrollview from "../components/Scrollview";

export default {
  name: "Blog",
  components: {
    Header,
    Footer,
    Scrollview,
  },
  mounted(){
    this.$refs.scrollviews.refresh();
  },
 
};
</script>
<style lang="scss">
#blog{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
