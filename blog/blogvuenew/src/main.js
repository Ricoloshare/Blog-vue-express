import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './assets/font/iconfont.js'
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import "github-markdown-css";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export const highlightCode = () => {
  const preEl = document.querySelectorAll('pre')

  preEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
}
// use
Vue.use(animated)

Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





