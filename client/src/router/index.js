import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Course from '../views/Course.vue'
import CourseDetail from '../views/CourseDetail.vue'
import MyLearning from '../views/MyLearning.vue'
import Topic from '../views/Topic.vue'
import Account from '../views/Account.vue'
import FAQ from '../views/FAQ.vue'
import Cart from '../views/Cart.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/courses',
    name: 'Course',
    component: Course
  },
  {
    path: '/course-detail/:id',
    name: 'CourseDetail',
    component: CourseDetail
  },
  {
    path: '/topic/:productId/seq/:sequence',
    name: 'Topic',
    component: Topic
  },
  {
    path: '/mylearning',
    name: 'MyLearning',
    component: MyLearning
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

export default router
