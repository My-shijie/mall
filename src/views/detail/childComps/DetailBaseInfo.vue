<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item"
            v-for="index in goods.services.length-1"
            :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    data() {
      return {
        num: 5
      }
    },
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 5px;
  }

  .info-title {
    font-weight: 800;
    line-height: 20px;
  }

  .info-price {
    height: 30px;
    line-height: 30px;
}

  .info-price .n-price {
    color: var(--color-high-text);
    font-weight: 600;
  }

  .info-price .o-price {
    font-size: 12px;
    text-decoration: line-through;
    margin: 0 3px;
    color: rgb(131, 130, 130);
  }

  .info-price .discount {
    padding: 0 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    font-size: 12px;
    position: relative;
    top: -5px;
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgb(230, 230, 230);
    padding: 0 0 5px;
  }

  .info-other span {
    font-size: 12px;
    color: rgb(131, 130, 130);
  }

  .info-services {
    font-weight: 800;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 30px 0;
    border-bottom: 5px solid rgba(192, 191, 191, 0.3);
  }

  .info-services-item img {
    position: relative;
    width: 12px;
    height: 12px;
    top: 1px;
  }
</style>
