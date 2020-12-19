import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 判断oldProduct（即判断cartList是否已有该商品）
      if(oldProduct){
        context.commit(ADD_COUNTER, oldProduct)
        resolve('数量+1')
      }else{
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  }
}