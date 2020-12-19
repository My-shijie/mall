<template>
  <div id="cart">
    <nav-bar class="navbar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 语法一
      // ...mapGetters(['cartLength', 'cartList'])
      // 语法二
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style>
  .cart {
    height: 100vh;
  }

  .navbar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
