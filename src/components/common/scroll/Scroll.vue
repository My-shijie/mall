<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 回顶部
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 上拉加载完成
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // 刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 获取切换主题前的 Y轴 滚动位置
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    // 组件创建完成后
    mounted() {
      // 默认情况下BScroll是不可以实时的监听滚动位置
      // probe 侦测
      // 0,1都是不侦测实时的位置
      // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      // 3. 只要是滚动，都侦测
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', position => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 监听滚动到 底部 的上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>
  
</style>