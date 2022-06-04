<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getMusicList } from '@/network/api/home'
import { handleBigNum } from '@/utils/publicTools'

interface IMusicList {
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
}
const musicList = ref<IMusicList[]>([])
onMounted(async () => {
  let res = await getMusicList()
  // console.log(res)
  musicList.value = res.data.result
})
</script>

<template>
  <div class="music-list">
    <div class="list-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="list-content">
      <van-swipe :loop="false" :width="150" class="my-swiper" :show-indicators="false">
        <van-swipe-item v-for="item in musicList" :key="item.id">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <div class="container">
              <img :src="item.picUrl" alt="">
              <div class="count">
                <i class="iconfont icon-bofang"></i>
                <span>{{ handleBigNum(item.playCount) }}</span>
              </div>
              <span class="name">{{ item.name }}</span>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="less" scoped>
.music-list {
  width: 100%;
  height: 5.2rem;
  padding: .2rem;

  .list-top {
    height: 20%;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: bold;
      font-size: 0.5rem;
    }

    .more {
      border: 1px solid #ccc;
      padding: 0.05rem 0.2rem;
      border-radius: 0.2rem;
    }
  }

  .list-content {
    width: 100%;
    height: 80%;
    position: relative;

    .my-swiper {
      height: 100%;

      .container {
        padding-left: .2rem;

        img {
          width: 100%;
          border-radius: .2rem;
        }

        .count {
          color: #ccc;
          position: absolute;
          top: .1rem;
          right: .1rem;

          .iconfont {
            position: relative;
            left: -.1rem;
          }
        }

        .name {
          font-size: .28rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
      }

    }
  }
}
</style>