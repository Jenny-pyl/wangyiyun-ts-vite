<script lang="ts" setup>
  import MusicDetail from '@/components/detail/MusicDetail.vue';
  import { ref, onMounted, watch } from 'vue'
  import { mainStore } from '@/store/mian'
  import { storeToRefs } from 'pinia'
  const store = mainStore()
  //解构（响应式）
  const { playList, playListIndex, isBtnShow, isDetailShow } = storeToRefs(store)
  const audio = ref<any>(null)
  onMounted(() => {
    // console.log(audio)
    // console.log(playListIndex)
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
  watch([playListIndex,playList],() => { //监听下标，如果下标发生改变，则自动播放音乐
    audio.value.autoplay = true
    if(audio.value.paused) {
      isBtnShow.value = false
    }
  },{
    deep: true
  })

  const showDetail = () => {
    isDetailShow.value = true
  }
</script>

<template>
  <div class="footer-music">
    <div class="f-left" @click="showDetail">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <Vue3Marquee><p class="name">{{playList[playListIndex].name}}</p></Vue3Marquee>
        <p class="toggle">横划可以切换上下首</p>
      </div>
      <van-popup v-model:show="isDetailShow" position="right" :style="{ height: '100%', width: '100%' }">
        <MusicDetail/>
      </van-popup>
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
    width: 70%;
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