<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getSearchMusic } from '@/network/api/home'
import { ISongs, IAr, IAl } from '@/utils/types'
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const store = mainStore()
const { playList, playListIndex } = storeToRefs(store)
const songList = ref<ISongs[]>([])
const router = useRouter()

//保存历史记录
const keyWordList = ref<string[]>([])
const keyWord = ref("")
const enterKey = async () => {
  if (!keyWord.value.trim()) return
  //向keyWordList添加元素采用头插法，交互效果更佳
  keyWordList.value.unshift(keyWord.value)
  keyWordList.value = [...new Set(keyWordList.value)]
  //把keyWordList数据保存到localStorage
  localStorage.setItem('keyWordList', JSON.stringify(keyWordList.value))
  let res = await getSearchMusic(keyWord.value)
  songList.value = res.data.result.songs
  console.log(res)
  keyWord.value = ""
}
//刷新如果keyWordList数据丢失，可向localStorage获取
onMounted(() => {
  keyWordList.value = JSON.parse(localStorage.getItem("keyWordList")!) || []
})

//清空历史记录
const clearKeyWordList = () => {
  keyWordList.value = []
  localStorage.removeItem("keyWordList")
}

//点击历史记录搜索
const search = async (item: string) => {
  let res = await getSearchMusic(item)
  console.log(res)
  songList.value = res.data.result.songs
}

//把搜索得到的歌曲保存到pinia
const addToPlayList = (item: ISongs) => {
  item.ar = item.artists
  item.al = {id: 111, picUrl:"https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"}
  playList.value.push(item)
  playListIndex.value = playList.value.length - 1
}

const backToHome = () => {
  router.go(-1)
}
</script>

<template>
  <div class="search-top">
    <i class="iconfont icon-zuojiantou" @click="backToHome"></i>
    <input type="text" placeholder="陈奕迅" @keydown.enter="enterKey" v-model="keyWord">
  </div>
  <div class="search-history">
    <span class="history">历史</span>
    <div class="center">
      <span class="ar-name" v-for="item in keyWordList" @click="search(item)">{{ item }}</span>
    </div>
    <i class="iconfont icon-shanchu" @click="clearKeyWordList"></i>
  </div>
  <div class="music-body">
    <div class="song-item" v-for="(item, index) in songList" :key="index">
      <div class="item-left" @click="addToPlayList(item)">
        <span class="id">{{ index + 1 }}</span>
        <div class="song-detail">
          <p class="name">{{ item.name }}</p>
          <p class="author">
            <span v-for="a in item.artists">{{ a.name + ' ' }}</span>
          </p>
        </div>
      </div>
      <div class="item-right">
        <i class="iconfont icon-shipin" v-if="item.mvid !== 0"></i>
        <i class="iconfont icon-caidanlan"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-top {
  width: 100%;
  height: 1rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: .4rem;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 90%;
    padding: .1rem;
  }
}

.search-history {
  width: 100%;
  height: .8rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;
  position: relative;

  .history {
    margin-right: .1rem;
    min-width: .6rem;
  }

  .center {
    // width: 6rem;
    height: 100%;
    width: 85%;
    white-space: nowrap;
    overflow: scroll;

    .ar-name {
      height: 100%;
      line-height: .8rem;
      background-color: #ccc;
      margin-right: .2rem;
      padding: .1rem;
      border-radius: .1rem;
      // position: relative;
      // top: .20rem;
    }
  }

  .iconfont {
    position: absolute;
    right: .2rem;
    // z-index: 9;
    background-color: #fff;
  }
}

.music-body {
  .iconfont {
    font-size: .4rem;
  }
  padding-bottom: 1.4rem;
  .song-item {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.16rem;
    .item-left {
      width: 70%;
      display: flex;
      justify-content: start;
      align-items: center;
      .id {
        margin-right: 0.2rem;
      }
      .song-detail {
        .name {
          font-weight: bold;
          //以下代码隐藏溢出文字
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        .author {
          color: #ccc;
          font-size: 0.24rem;
          //以下代码隐藏溢出文字
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
      }
    }
    .item-right {
      .iconfont {
        margin-left: 0.3rem;
        width: 0.44rem;
      }
    }
  }
}
</style>