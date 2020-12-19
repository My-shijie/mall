<template>
  <div id="detail_bottom_bar">
    <div class="bottom_left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom_right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  #detail_bottom_bar {
    font-size: 14px;
    display: flex;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    text-align: center;
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.2);
  }
  .bottom_left {
    display: flex;
    flex: 1;
  }
  .bottom_left > div {
    flex: 1;
    border-right: 1px solid rgba(128, 128, 128, 0.2);
    padding-top: 6px;
  }
  .bottom_left .icon {
    display: block;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    width: 16px;
    height: 16px;
    margin: 2px auto;
  }
  .service .icon {
    background-position: 0 -38px;
  }
  .shop .icon {
    background-position: 0 -72px;
  }
  .bottom_right {
    display: flex;
    flex: 1;
  }
  .bottom_right > div {
    flex: 1;
    line-height: 50px;
  }
  .cart {
    background-color: rgb(255, 174, 0);
  }
  .buy {
    background-color: var(--color-tint);
    color: white;
  }
</style>
