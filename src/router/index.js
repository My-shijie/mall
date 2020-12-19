import Vue from 'vue'
import Vuerouter from 'vue-router'

// 路由懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 1.安装插件
Vue.use(Vuerouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new Vuerouter({
  routes,
  mode: 'history'
})

export default router

// push()报错解决方法
const originalPush = Vuerouter.prototype.push
  Vuerouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
// replace()报错解决方法
const originalReplace = Vuerouter.prototype.replace;
  Vuerouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};