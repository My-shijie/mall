<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control @tabClick="tabClick" 
                  :titles="['流行', '新款', '精选']"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" 
            :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <!-- <div ref="text">666</div> -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control @tabClick="tabClick" 
                  :titles="['流行', '新款', '精选']"
                  ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    // 混入（监听GoodsListItem组件中图片加载完成）
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    methods: {
      /**
       *  事件监听相关的方法
       */
      // 切换商品的主题 ['流行', '新款', '精选']
      tabClick(index) {
        switch (index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
        // 同步设置两个tabControl的标题下标
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 监听滚动的位置
      contentScroll(position) {
        // console.log(position.y);
        // 1.设置BackTop标签的显示和隐藏的临界值
        this.listenShowBackTop(position);

        // 2.决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
      },
      // 上拉加载更多
      loadMore() {
        // 上拉加载对应主题 ['流行', '新款', '精选'] 的数据
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el，用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop);
      },
      /**
       *  网络请求相关的方法
       */
      // 获取轮播图数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      // 获取商品信息数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          // 方法一
          // for(let good of res.data.list){
          //   this.goods[type].list.push(good)
          // }
          // 方法二
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成加载更多，调用finishPullUp()才能继续加载
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      // 组件处于活跃（选中）状态时，设置用户原来滚动的 Y轴位置
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // 1.组件处于不活跃（不选中）状态时，保存当前用户滚动的 Y轴位置
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);

      // 2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 45px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /**
     *  在使用浏览器原生滚动时，伪类让导航不跟随一起滚动而设置的，
     *  而使用better-scroll时会设置规定区域滚动，并不会影响这个组件
     */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    /* 方法一 */
    /* height: calc(100vh - 94px);
    overflow: hidden; */
    /* 方法二 */
    position: absolute;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 49px;
    overflow: hidden;
  }
</style>
