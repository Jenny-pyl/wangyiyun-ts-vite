<script lang="ts" setup>
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const store = mainStore()
const { playList, playListIndex, isDetailShow } = storeToRefs(store)
const curSong = ref(playList.value[playListIndex.value])
const back = () => {
  isDetailShow.value = false
  console.log(111)
}
</script>

<template>
  <div class="music-detail">
    <img :src="curSong.al.picUrl" class="bc-img"/>
    <div class="detail-top">
      <div class="t-left">
        <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="info">
          <Vue3Marquee><div class="song-name">{{curSong.name}}</div></Vue3Marquee>
          <div>
            <span class="ar-name">{{curSong.ar[0].name}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="t-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detail-center"></div>
    <div class="detail-bottom"></div>
  </div>
</template>

<style lang="less" scoped>
.bc-img {
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(0.8rem);
}
.music-detail {
  width: 100%;
  .detail-top {
    color: #fff;
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    .icon {
      fill: #fff;
      min-width: .7rem;
    }
    .t-left {
      display: flex;
      align-items: center;
      width: 3rem;
      .info {
        margin-left: .25rem;
        display: flex;
        flex-direction: column;
        .song-name {
          font-size: 0.32rem;
          // width: 3rem;
        }
        .ar-name {
          font-size: 0.2rem;
          color: #ccc;
        }
        .icon {
          width: 0.22rem;
          position: relative;
          top: 0.15rem;
          // left: -.1rem;
          fill: #ccc;
          min-width: .22rem;
        }
      }
    }
  }
}
</style>