<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { IPlayList, ICreator } from '@/utils/types';
import { handleBigNum } from '@/utils/publicTools'
const props = defineProps<{
  playList: IPlayList
}>()
const router = useRouter()
function goBack(): void {
  router.push({ path: '/' })
}
</script>

<template>
  <img :src="playList.coverImgUrl" class="bg-img">
  <div class="item-music-top">
    <div class="top">
      <div class="t-left">
        <svg class="icon" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span class="song-list">歌单</span>
      </div>
      <div class="t-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-caidanlan"></use>
        </svg>
      </div>
    </div>
    <div class="center">
      <div class="c-left">
        <img :src="playList.coverImgUrl" alt="">
        <div class="play-count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>{{ handleBigNum(playList.playCount) }}</span>
        </div>
      </div>
      <div class="c-right">
        <p class="name">{{ playList.name }}</p>
        <div class="creator">
          <img :src="playList.creator?.avatarUrl" alt="">
          <span>{{ playList.creator?.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="description">{{ playList.description }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="b-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31xiaoxi"></use>
        </svg>
        <span>{{ playList.commentCount }}</span>
      </div>
      <div class="b-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playList.shareCount }}</span>
      </div>
      <div class="b-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-16"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="b-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg-img {
  position: absolute;
  z-index: -1;
  width: 100%;
  filter: blur(1rem);
}

.item-music-top {
  color: #f6f1f1;
  width: 100%;
  height: 5.5rem;
  padding: 0 0.2rem;
  display: flex;
  flex-direction: column;

  .icon {
    fill: #f6f1f1;
  }

  .top {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .t-left {
      width: 25%;
      display: flex;
      justify-content: space-between;

      .song-list {
        font-size: 0.4rem;
      }
    }

    .t-right {
      width: 20%;
      display: flex;
      justify-content: space-between;
    }
  }

  .center {
    width: 100%;
    height: 60%;
    padding-top: .2rem;
    display: flex;
    align-items: flex-start;

    .c-left {
      width: 50%;
      padding-right: .2rem;
      min-width: 3rem;
      position: relative;
      img {
        width: 100%;
        border-radius: .2rem;
      }
      .play-count {
        position: absolute;
        top: .1rem;
        right: .3rem;
        .icon {
          position: relative;
          top: .1rem;
          left: -.1rem;
        }
      }
    }

    .c-right {
      .name {
        font-weight: bold;
        font-size: .4rem;
      }

      .creator {
        display: flex;
        align-items: center;
        font-size: 0.2rem;
        padding: .1rem 0;
        color: #585353;

        img {
          width: 0.6rem;
          border-radius: 50%;
          margin-right: .2rem;
        }

        .icon {
          fill: #585353;
          width: .25rem;
          position: relative;
          top: 0.02rem;
        }
      }

      .description {
        color: #585353;
        font-size: 0.28rem;
        //文字溢出处理
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;

      }
    }
  }

  .bottom {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .b-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        margin-bottom: .2rem;
      }
    }
  }
}
</style>