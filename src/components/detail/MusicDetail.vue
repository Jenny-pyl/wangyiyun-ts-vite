<script lang="ts" setup>
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia'
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps<{
  play: Function
}>()

const store = mainStore()
const { playList, playListIndex, isDetailShow, isBtnShow, lyricList, currentTime, totalSongTime } = storeToRefs(store)

const curSong = computed(() => {
  return playList.value[playListIndex.value]
})

//控制歌词是否显示
const isLyricShow = ref(false)
const back = () => {
  isDetailShow.value = false
  isLyricShow.value = false
}
// onMounted(() => {
//   console.log(lyricList.value)
//   console.log(lyricArr.value)
// })

//对歌词字符串的处理
const lyricArr = computed(() => {
  let arr: any = [];
  //当pinia的lyricList更新拿到数据后再对歌词字符串分割
  //todo：arr
  if (lyricList) {
    arr = lyricList.value.split(/[(\r\n)\r\n]+/)
      .map(item => {
        let min = item.slice(1, 3)
        let sec = item.slice(4, 6)
        let mill: any = item.slice(7, 10)
        let lrc = item.slice(11, item.length)
        if (isNaN(mill)) {
          mill = item.slice(7, 9)
          lrc = item.slice(10, item.length)
        }
        let time = parseInt(min) * 60 + parseInt(sec) + parseFloat(mill) / 1000
        return { min, sec, mill, lrc, time }
      })
      //把数组最后一项（空）过滤掉
      .filter((_, index, arr) => index !== arr.length - 1)
      // .map((item, index, arr) => index === arr.length - 1 ? {...item,next:10000000} : {...item,next:arr[index + 1].time})
      .map((item, index, arr) => ({...item,next:index === arr.length - 1?1000000 : arr[index + 1].time}))
      ;
  }
  return arr
})

//获取歌词容器
const musicLyric = ref<any>(null)
watch(currentTime, () => {
  let p: any = document.querySelector('p.active')
  // console.log([p])
  if (p && p.offsetTop > 250) {
    musicLyric.value.scrollTop = p.offsetTop - 250
  }
})

//控制歌词是否显示
const showLyric = (value: boolean) => {
  isLyricShow.value = value
}

//歌曲上下首切换
const preSong = () => {
  if (playListIndex.value === 0) {
    playListIndex.value = playList.value.length
  } else {
    playListIndex.value = playListIndex.value - 1
  }
}
const nextSong = () => {
  if (playListIndex.value === playList.value.length) {
    playListIndex.value = 0
  } else {
    playListIndex.value = playListIndex.value + 1
  }
}

//切换上下首后歌词容器musicLyric的scrollTop也需要改变
watch(playListIndex, () => {
  setTimeout(() => {
    // musicLyric && (musicLyric.value.scrollTop = 0)
    musicLyric.value.scrollTop = 0
  },20)
})
</script>

<template>
  <div class="music-detail">
    <img :src="curSong.al.picUrl" class="bc-img"/>
    <div class="detail-top">
      <div class="t-left">
        <i class="iconfont icon-zuojiantou" @click="back"></i>
        <div class="info">
          <Vue3Marquee>
            <div class="song-name">{{ curSong.name }}</div>
          </Vue3Marquee>
          <div>
            <span class="ar-name">{{ curSong.ar[0].name }}</span>
            <i class="iconfont icon-youjiantou right-arow" @click="back"></i>
          </div>
        </div>
      </div>
      <div class="t-right">
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>

    <div ref="musicLyric" class="lyric" v-if="isLyricShow" @click="showLyric(false)">
      <p v-for="item in lyricArr" :key="item" :class="{ active: (currentTime >= item.time && currentTime < item.next) }">
        {{ item.lrc }}
      </p>
    </div>
    <div class="detail-center" v-else>
      <img src="@/assets/imgs/needle-plus.png" class="img_needle" :class="{ img_needle_active: !isBtnShow }">
      <img src="@/assets/imgs/disc-plus.png" class="img_cd">
      <img :src="curSong.al.picUrl" alt="" class="img_ar" :class="{ img_ar_active: !isBtnShow, img_ar_paused: isBtnShow }"
        @click="showLyric(true)">
    </div>


    <div class="detail-bottom">
      <div class="b-top">
        <i class="iconfont icon-aixin"></i>
        <i class="iconfont icon-xiazai-wenjianxiazai-07"></i>
        <i class="iconfont icon-yinlechangpian"></i>
        <i class="iconfont icon-31xiaoxi"></i>
        <i class="iconfont icon-liebiao-"></i>
      </div>
      <div class="b-mid">
        <input type="range" class="range" min="0" :max="totalSongTime" v-model="currentTime" step="0.05">
      </div>
      <div class="b-bottom">
        <i class="iconfont icon-24gl-repeat2"></i>
        <i class="iconfont icon-shangyishou" @click="preSong"></i>
        <i class="iconfont icon-bofang control" @click="play()" v-if="isBtnShow"></i>
        <i class="iconfont icon-zanting control" @click="play()" v-else></i>
        <i class="iconfont icon-xiayishou" @click="nextSong"></i>
        <i class="iconfont icon-zu"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iconfont {
  font-size: 0.6rem;
  color: rgb(233, 219, 219);
}
.bc-img {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(0.8rem);
}

.music-detail {

  // width: 375px;
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
        margin-top: .2rem;
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

        .right-arow {
          font-size: 12px;
        }
      }
    }
  }

  .lyric {
    width: 100%;
    height: 8rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    padding-top: .2rem;

    p {
      color: rgb(230, 219, 219);
      margin-bottom: .4rem;
      text-align: center;
    }

    .active {
      font-size: 0.5rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
  }

  .detail-center {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-10deg);
      transition: all 2s;
    }

    .img_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(2deg);
      transition: all 2s;
    }

    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }

    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
      animation-play-state: running;
    }

    .img_ar_paused {
      animation-play-state: paused;
    }

    @keyframes rotate_ar {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  .detail-bottom {
    width: 100%;
    height: 3.14rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .b-top {
      padding: 0 .1rem;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }

    .b-mid {
      width: 100%;
      .range {
        width: 100%;
        height: 0.4rem;
      }
    }

    .b-bottom {
      padding: 0 .1rem;
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;

      .control {
        font-size: 1rem;
      }
    }
  }
}
</style>