<script lang="ts" setup>
import MusicDetail from '@/components/detail/MusicDetail.vue';
import { ref, onMounted, watch, onUpdated, computed } from 'vue'
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia'

const store = mainStore()
//解构（响应式）
const { playList, playListIndex, isBtnShow, isDetailShow, lyricList, currentTime, totalSongTime } = storeToRefs(store)
const curSong = computed(() => {
  return playList.value[playListIndex.value]
})

//获取audio元素，play()实现控制音乐的播放与暂停
const audio = ref<HTMLAudioElement | null>(null)
// const tmp = document.createElement("audio")
const play = () => {
  if (audio.value?.paused) {
    audio.value?.play()
    isBtnShow.value = false
  } else {
    audio.value?.pause()
    isBtnShow.value = true
  }
}

//监听下标与歌单，如果下标或歌单发生改变，则自动播放音乐
watch([playListIndex, playList], () => { 
  if(audio.value) {
    audio.value.autoplay = true
  }
  if (audio.value?.paused) {
    isBtnShow.value = false
  }
})

//点击展现组件MusicDetail
const showDetail = () => {
  isDetailShow.value = true
}

//当curSong挂载或者更新时就要获取歌词,歌词对象保存在pinia中
onUpdated(async() => {
  lyricList.value = await store.getLyric(curSong.value.id)
  // console.log(res)
})
onMounted(async() => {
  lyricList.value = await store.getLyric(curSong.value.id)
})

//实时监听歌曲播放的时间并把时间传给pinia的currentTime
const updateCurrentTime = () => {
  currentTime.value = audio.value!.currentTime
}

//监听当前歌曲是否播放完，若播放完则自动跳到下一首
watch(currentTime, () => {
  if(currentTime.value === totalSongTime.value) {
    if(playListIndex.value === playList.value.length - 1){
      playListIndex.value = 0
    }else {
      playListIndex.value = playListIndex.value + 1
    }
  }
})

const updateSongTotalTime = () => {
  totalSongTime.value = audio.value!.duration
}

const canPlaySong = () => {
  updateSongTotalTime()
}

</script>

<template>
  <div class="footer-music">
    <div class="f-left" @click="showDetail">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <Vue3Marquee>
          <p class="name">{{ playList[playListIndex].name }}</p>
        </Vue3Marquee>
        <p class="toggle">横划可以切换上下首</p>
      </div>
    </div>
    <div class="f-right">
      <i class="iconfont icon-bofang" @click="play" v-if="isBtnShow"></i>
      <i class="iconfont icon-zanting" @click="play" v-else></i>
      <i class="iconfont icon-zu"></i>
    </div>
    <audio ref="audio" 
          @timeupdate="updateCurrentTime" 
          :src="`http://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
          @canplay="canPlaySong"></audio>
    <van-popup v-model:show="isDetailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <MusicDetail :play="play"/>
    </van-popup>
  </div>
</template>

<style lang="less" scoped>
.iconfont {
  font-size: 0.6rem;
}
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
      width: 1.1rem;
      height: 1.1rem;
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