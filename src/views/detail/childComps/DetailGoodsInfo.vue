<template>
  <div id="detail_goods_info" v-if="Object.keys(detailInfo).length != 0">
    <div class="goods_info_desc">
      <div style="float: left" class="desc_line">
        <i class="desc_dot"></i>
      </div>
      <div class="desc_text">
        {{ detailInfo.desc }}
      </div>
      <div style="float: right" class="desc_line">
        <i style="right: 0px" class="desc_dot"></i>
      </div>
    </div>
    <div class="goods_info_key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="goods_info_imgs">
      <img :src="item"
           v-for="(item, index) in detailInfo.detailImage[0].list"
           :keys="index"
           @load="imgLoad"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data(){ 
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        // 判断，所有的图片都加载完了，那么进行一次回调就可以了
        if(++this.counter === this.imagesLength){
          this.$emit("imageLoad");
        }
      },
    },
    watch: {
      detailInfo() {
        // 获取图片的个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  };
</script>

<style scoped>
  #detail_goods_info {
    font-size: 12px;
    border-bottom: 5px solid rgba(199, 198, 198, 0.3);
  }
  .goods_info_desc {
    font-size: 12px;
    padding: 8px 8px;
  }
  .desc_line {
    width: 60px;
    height: 2px;
    background-color: gray;
    position: relative;
  }

  .desc_dot {
    position: absolute;
    top: 0;
    display: inline-block;
    width: 5px;
    height: 2px;
    background-color: black;
    border-radius: 50%;
  }

  .desc_text {
    padding: 15px 0;
    color: gray;
  }

  .goods_info_key {
    padding: 10px;
  }
  .goods_info_imgs img {
    width: 100%;
  }
</style>
