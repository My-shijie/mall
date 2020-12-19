<template>
  <div class="cart_list_item">
    <check-button :is-checked="product.checked"
                  @click.native="checkClick"/>

    <div class="item_img">
      <img :src="product.image"/>
    </div>

    <div class="item_info">
      <p class="item_title">{{ product.title }}</p>
      <p class="item_desc">{{ product.desc }}</p>
      <span class="item_price">￥{{ product.price }}</span>
      <span class="item_count">x{{ product.count }}</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked;
      }
    }
  }
</script>

<style scoped>
  .cart_list_item {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.4);
    display: flex;
    padding: 5px 0;
  }

  .item_img {
    width: 70px;
    height: 100%;
    margin-right: 5px;
  }
  .item_img img {
    width: 70px;
    height: 100%;
    border-radius: 8px;
  }

  .item_info {
    position: relative;
    width: calc(100% - 70px - 20px - 30px);
    margin: 0 10px;
  }
  .item_info p {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .item_title {
    font-size: 20px;
    padding-bottom: 8px;
  }
  .item_desc {
    font-size: 10px;
    color: gray;
  }
  .item_price {
    position: absolute;
    left: 1px;
    bottom: 6px;
    font-size: 20px;
    color: orangered;
  }
  .item_count {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 14px;
  }
</style>
