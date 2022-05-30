<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getBanners } from '@/network/api/home'

interface IImage {
  pic: string
}
const images = ref<IImage[]>([])
onMounted(async() => {
  let res = await getBanners()
  // console.log(res)
  images.value = res.data.banners
})
</script>

<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" lazy-render class="swipe">
      <van-swipe-item v-for="image in images" :key="image.pic">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="less">
.swiper {
  width: 100%;
  padding: .2rem;
  height: 3.5rem;
  .swipe {
    height: 100%;
    width: 100%;
    border-radius: 0.2rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .van-swipe__indicator--active {
    background-color: rgb(205, 39, 39);
  }
}
</style>