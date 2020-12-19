<template>
  <div class="tab-control">
    <div @click="itemClick(index)" v-for="(item, index) in titles" 
    class="tab-control-item" :class="{active: currentIndex===index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // 子传父
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
    padding: 5px 15px;
  }
</style>