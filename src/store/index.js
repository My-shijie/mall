import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点（方便数据跟踪）
  mutations,
  actions,
  getters
})

// 3.导出挂载Vue实例上
export default store