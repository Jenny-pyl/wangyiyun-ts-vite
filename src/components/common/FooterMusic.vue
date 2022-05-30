<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { mainStore } from '@/store/mian'
  import { storeToRefs } from 'pinia';
import { watch } from 'fs';
  const store = mainStore()
  //解构（响应式）
  const { playList, playListIndex, isBtnShow } = storeToRefs(store)
  const audio = ref<any>(null)
  const num = ref(0)
  onMounted(() => {
    // console.log(audio)
    console.log(playListIndex)
  })
  const play = () => {
    console.log(111)
    if(audio.value.paused) {
      audio.value.play()
      isBtnShow.value = false
    }else {
      audio.value.pause()
      isBtnShow.value = true
    }
  }
  // watch(playListIndex,() => {

  // },{
  //   deep: true
  // })
</script>

<template>
  <div class="footer-music">
    <div class="f-left">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <p class="name">{{playList[playListIndex].name}}</p>
        <p class="toggle">横划可以切换上下首</p>
      </div>
    </div>
    <div class="f-right">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`http://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
  </div>
</template>

<style lang="less" scoped>
.footer-music {
  width: 100%;
  height: 1.4rem;
  padding: 0 .2rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
  position: fixed;
  bottom: -0.02rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .f-left {
    display: flex;
    align-items: center;
    img {
      width: 55px;
      border-radius: 50%;
      margin-right: .2rem;
    }
    .name {
      font-weight: bold;
      font-size: 0.4rem;
    }
    .toggle {
      color: #7e7b7b;
      font-size: 0.28rem;
    }
  }
  .f-right {
    width: 20%;
    display: flex;
    justify-content: space-around;
  }
}
</style>