<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    background-color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: auto 3px;
    border-radius: 50%;
    border: 2px solid rgba(102, 101, 101, 0.3);
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>
