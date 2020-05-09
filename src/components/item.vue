<template>
  <a class="daily-item">
      <div class="daily-img" v-if="data.images">
          <img :src="imgPath + data.images[0]" alt="">
      </div>
      <div class="daily-title" :class="{ noImg:!data.images}">{{data.title}}</div>
  </a>
</template>

<script>
import $ from '../network/util'
export default {
    props:['data'],
    data() {
        return {
            imgPath:$.imgPath
        }
    },
}
</script>

<style>

</style>