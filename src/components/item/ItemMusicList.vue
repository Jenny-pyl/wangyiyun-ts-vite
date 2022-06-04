<script lang="ts" setup>
import { ISongs, IAl, IAr } from '@/utils/types';
import { defineProps } from 'vue';
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia';

const props = defineProps<{
  songs: Array<ISongs> | any
  subscribedCount: number
}>()

const main = mainStore()
const { playList, playListIndex } = storeToRefs(main)

const playMusic = (index:any) => {
  playList.value = props.songs
  playListIndex.value = index
}
</script>

<template>
  <div class="item-music-list">
    <div class="list-header">
      <div class="h-left">
        <i class="iconfont icon-bofang"></i>
        <p>播放全部<span>(共20首)</span></p>
      </div>
      <div class="h-right">
        <i class="iconfont icon-jiahao"></i>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="list-container" v-for="(item, index) in songs">
      <div class="c-left" @click="playMusic(index)">
        <span class="id">{{ index + 1 }}</span>
        <div class="detail">
          <span class="song-name">{{ item.name }}</span>
          <div class="ar-name">
            <span v-for="ar in item.ar">
              {{ ar.name + " " }}
            </span>
          </div>
        </div>
      </div>
      <div class="c-right">
        <i class="iconfont icon-shipin" v-show="item.mv != 0"></i>
        <i class="iconfont icon-caidanlan"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iconfont {
  font-size: .5rem;
}
.item-music-list {
  width: 100%;
  // height: 7.84rem;
  padding: 0 .2rem;
  margin-bottom: 1.4rem;
  background-color: #fff;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
  .list-header {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .h-left {
      display: flex;
      align-items: center;

      .icon {
        margin-right: .15rem;
      }

      span {
        color: #ccc;
        font-size: 0.25rem;
      }
    }

    .h-right {
      padding: .1rem .1rem;
      border-radius: .2rem;
      background-color: rgb(216, 33, 33);
      display: flex;
      align-items: center;
      color: #fff;

      .iconfont {
       font-size: 0.28rem;
      }
    }
  }

  .list-container {
    margin-top: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .c-left {
      display: flex;
      align-items: center;

      .id {
        margin-right: .2rem;
      }

      .detail {
        display: flex;
        flex-direction: column;

        .song-name {
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }

        .ar-name {
          color: #ccc;
          font-size: 0.20rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
      }
    }

    .c-right {
      width: 20%;
      min-width: 1.428rem;
      display: flex;
      justify-content: flex-end;

      .iconfont {
        margin-left: .21rem
      }
    }
  }
}
</style>