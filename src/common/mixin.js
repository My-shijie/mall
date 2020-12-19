import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

// 图片加载
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1.对 this.$refs.scroll.refresh 这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 3.对监听的事件进行保存
    this.itemImgListener = () => {
      // 没加载一张图片就刷新一次（解决scroll上拉bug）
      refresh()
    }
    // 3.在 Home组件 中监听GoodsListItem组件中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

// 回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 回到顶部
    backClick() {
      // this.$refs.scroll 表示获取组件对象
      // console.log(this.$refs.scroll);
      // 调用Scroll组件的scrollTo()，回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 设置BackTop标签的显示和隐藏的临界值
    listenShowBackTop(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000
    }
  }
}
