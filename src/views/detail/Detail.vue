<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="navbar"/>
    
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    // 混入（监听GoodsListItem组件中图片加载完成）
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0
      }
    },
    created() {
      // 1.保存传入的idd
      this.iid = this.$route.params.iid

      // 2.根据idd请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        // 1)获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        // 2)获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3)创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4)获取商品详细信息
        this.detailInfo = data.detailInfo

        // 5)获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6)取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // Dom渲染完成会回调$nextTick()函数，但是图片还没有加载完毕
        // this.$nextTick(() => {
        //   // 标题['商品', '参数', '评论', '推荐']的首位置
        //   // 目前获取到的offsetTop不包含其中的图片
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop- 44)
        //   console.log(this.themeTopYs);
        // })
      })

      // 3.获取推荐的信息
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    methods: {
      ...mapActions(['addCart']),
      // DetailGoodsInfo组件 的图片加载完后刷新一下
      imageLoad() {
        this.$refs.scroll.refresh()

        // 保存标题['商品', '参数', '评论', '推荐']的首位置
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop- 44)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },
      // 标题切换 ['商品', '参数', '评论', '推荐']
      titleClick(index) {
        // 点击标题跳转到对应位置
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      },
      // 监听滚动事件
      contentScroll(position) {
        // 1.保存y值
        const positionY = -position.y
        
        // 2.positionY和主题中的值进行对比
        let length = this.themeTopYs.length
        // 方法一
        // for(let i=0; i<length; i++){
        //   if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) 
        //   || (i === length-1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     this.$refs.navbar.currentIndex = this.currentIndex;
        //   }
        // }
        // 方法二（减少判断条件，themeTopYs 中多添加一个非常大的值）
        for(let i=0; i<length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = this.currentIndex;
          }
        }

        // 3.设置BackTop标签的显示和隐藏的临界值
        this.listenShowBackTop(position)
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里
        // 用映射的方法 ...mapActions
        // this.addCart(product).then(res => {
        //   this.isShow = true;
        //   this.message = res;
        //   setTimeout(() => {
        //     this.isShow = false;
        //     this.message = ''
        //   }, 1500)
        // });
        this.addCart(product).then(res => {
          // console.log(this.$toast);
          this.$toast.show(res, 2000);
        })

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // });
      }
      
    },
    mounted() {
      
    },
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 45px - 49px);
    /* position: absolute;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 49px;
    overflow: hidden; */
  }
</style>
