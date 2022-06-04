<script lang="ts" setup>
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia'
import { ref, watch, defineProps, computed, onMounted } from 'vue'
const store = mainStore()
const { playList, playListIndex, isDetailShow, isBtnShow, lyricList } = storeToRefs(store)
const curSong = computed(() => {
  return playList.value[playListIndex.value]
})
const back = () => {
  isDetailShow.value = false
  isLyricShow.value = false
}
const props = defineProps<{
  play: Function
}>()
//控制歌词是否显示
const isLyricShow = ref(false)

onMounted(() => {
  console.log(lyricList.value)
  console.log(lyricArr)
})

const lyricArr = computed(() => {
  let arr:any = [];
  //当pinia的lyricList更新拿到数据后再对歌词字符串分割
  if(lyricList) {
    arr = lyricList.value.split(/[(\r\n)\r\n]+/)
                          .map((item,i) => {
                            let min = item.slice(1,3)
                            let sec = item.slice(4,6)
                            let mill:any = item.slice(7,10)
                            let lrc = item.slice(11,item.length)
                            if(isNaN(mill)) {
                              mill = item.slice(7,9)
                              lrc = item.slice(10,item.length)
                            }
                            let time = parseInt(min)*60 + parseInt(sec) + parseFloat(mill)/1000
                            return {min, sec, mill, lrc, time}
                          })
  }
  return arr
})

const showLyric = () => {
  isLyricShow.value = true
}
</script>

<template>
  <div class="music-detail">
    <img :src="curSong.al.picUrl" class="bc-img"/>
    <div class="detail-top">
      <div class="t-left">
        <svg class="icon"   @click="back">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="info">
          <Vue3Marquee><div class="song-name">{{curSong.name}}</div></Vue3Marquee>
          <div>
            <span class="ar-name">{{curSong.ar[0].name}}</span>
            <svg class="icon"  >
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="t-right">
        <svg class="icon"  >
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>

    <div class="lyric"  v-if="isLyricShow">
      <p v-for="item in lyricArr" :key="item">
        {{item.lrc}}
      </p>
    </div>
    <div class="detail-center" v-else>
      <img src="@/assets/imgs/needle-plus.png" class="img_needle" :class="{img_needle_active: !isBtnShow}">
      <img src="@/assets/imgs/disc-plus.png" class="img_cd">
      <img :src="curSong.al.picUrl" alt=""
           class="img_ar" 
           :class="{img_ar_active: !isBtnShow, img_ar_paused: isBtnShow}"
           @click="showLyric">
    </div>
    
    
    <div class="detail-bottom">
      <div class="b-top">
        <svg class="icon">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-31xiaoxi"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="b-mid"></div>
      <div class="b-bottom">
        <svg class="icon">
          <use xlink:href="#icon-24gl-repeat2"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg class="icon control"  @click="play()" v-if="isBtnShow">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon control" @click="play()" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
  .lyric {
    width: 100%;
    height: 8rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    margin-top: .2rem;
    p {
      color: rgb(230, 219, 219);
      margin-bottom: .4rem;
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
      height: 3,2rem;
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
      0%{
        transform: rotate(0deg);
      }
      100%{
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
    .icon {
      fill: #ccc;
    }
    .b-top {
      padding: 0 .1rem;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
    .b-mid {

    }
    .b-bottom {
      padding: 0 .1rem;
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      .control {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>