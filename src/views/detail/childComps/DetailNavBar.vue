<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" 
           class="title-item" 
           @click="itemClick(index)"
           :class="{active: currentIndex===index}">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 子传父
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .back img {
    margin-top: 11px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
