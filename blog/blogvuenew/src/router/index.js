import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from '../views/Blog.vue'
import Home from '../views/Home.vue'
import Life from '../views/Life.vue'
import Articles from '../views/Articles.vue'
import Message from '../views/Message.vue'
import Resources from '../views/Resources.vue'
import About from '../views/About.vue'
import Login from '../views/Manage/Login.vue'
import Edit from '../views/Manage/Edit.vue'
import EditArt from '../components/Manage/EditArticle'
import EditLife from '../components/Manage/EditLife'
import CreateArt from '../components/Manage/CreateArt'
import ShowArt from '../views/ShowArt'
import EditMeg from '../components/Manage/EditMeg'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Blog,
    children: [
      { path: '/', component: Home },
      { path: '/home', component: Home },
      { path: '/Life', component: Life },
      { path: '/Articles', component: Articles },
      { path: '/mesg', component: Message },
      { path: '/Resources', component: Resources },
      { path: '/about', component: About },
      { path: '/detail', component: ShowArt},
    ]
  },
  { path: '/login', component: Login},
  { path: '/edit', component: Edit,
    children: [
      { path: '/', component: CreateArt},
      { path: '/editart', component: EditArt },
      { path: '/editlife', component: EditLife },
      { path: '/addart', component: CreateArt },
      { path: '/editmeg', component: EditMeg },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
