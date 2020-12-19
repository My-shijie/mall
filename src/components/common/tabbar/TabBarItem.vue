<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'var(--color-high-text)'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      // 计算是否处于活跃状态，变化 图标 颜色
      isActive() {
        // 处于活跃状态的路由的路径 与 当前的路径相同时为 true，反之为 false
        // return this.$route.path === this.path;
        // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        // 如果要检索的字符串值没有出现，则该方法返回 -1
        return this.$route.path.indexOf(this.path) !== -1
      },
      // 计算是否处于活跃状态，变化 文字 颜色
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // console.log(this.path);
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>
