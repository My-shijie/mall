<template>
  <div class="bottom-bar">
    <div class="checked-all">
      <check-button class="check-button" 
                    @click.native="checkClick"
                    :is-checked="isCheckedAll"/>
      <span>全选</span>
    </div>
    <div class="clear" @click="clearClick">清空购物车</div>
    <div class="price">合计:<em>￥{{totalPrice}}</em></div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isCheckedAll() {
        if(this.cartList.length === 0)  return false
        // 1.使用filter()
        // 表示如果有一个商品没被选中（没被选中的数组的长度，再取反会得到 false）
        // return !(this.cartList.filter(item => !item.checked).length)

        // 2.使用find()
        // return !this.cartList.find(item => !item.checked)

        // 3.普通遍历
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if(this.isCheckedAll){  // 全选按钮是 选中状态 被点击时
          this.cartList.forEach(item => item.checked = false);
        }else{  // 全选按钮是 不被选中状态 被点击时
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if(this.cartList.filter(item => !item.checked).length === this.cartList.length){
          this.$toast.show('请选择购买的商品', 2000)
        }
      },
      clearClick() {
        this.cartList.splice(0);
        this.$toast.show('购物车已清空', 2000)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 16px;    
    display: flex;
    text-align: center;
  }

  .checked-all {
    width: 70px;
    display: flex;
  }

  .clear {
    width: 80px;
    background-color: rgba(175, 174, 174, 0.1);
  }

  .price {
    flex: 1;
  }

  .calculate {
    width: 80px;
    color: #fff;
    background-color: red;
  }
</style>
