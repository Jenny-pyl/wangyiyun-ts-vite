<script lang="ts" setup>
import { mainStore } from '@/store/mian'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = mainStore()
const { user } = storeToRefs(store)

const backToHome = () => {
  router.push('/')
}

const userInfo = computed(() => {
  return user.value?.backgroundUrl
    ? user.value
    : (user.value = JSON.parse(localStorage.getItem("user")!));
})
</script>

<template>
  <div class="top-nav">
    <i class="iconfont icon-zuojiantou" @click="backToHome"></i>
    <i class="iconfont icon-liebiao-dian"></i>
  </div>
  <div class="bcimg">
    <img :src="userInfo.backgroundUrl" alt="">
  </div>
  <div class="center">
    <img :src="userInfo.avatarUrl" alt="">
    <div class="name">{{ userInfo.nickname }}</div>
    <div class="level">
      <span>关注{{ userInfo.follows }}</span>
      <span class="fan">粉丝{{ userInfo.followeds }}</span>
      <span>等级 Lv.7</span>
    </div>
    <div class="detail">
      <span>00后 双鱼座</span>
      <span>浙江 杭州</span>
      <span>村龄 2年</span>
    </div>
  </div>
  <div class="footer">
    <div class="footer-bar">
      <span class="active">主页</span>
      <span>动态</span>
      <span>播客</span>
    </div>
    <div class="footer-container">
      <span class="base">基本信息</span>
      <span>村龄：2年(2019年08月注册)</span>
      <span>性别: {{ userInfo.gender === 2 ? '女' : '男' }}</span>
      <span>个人简介：{{ userInfo.signature }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-nav {
  width: 100%;
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  .iconfont {
    color: #fff;
    font-size: .6rem;
  }
}

.bcimg {
  width: 100%;
  position: absolute;
  top: -0.88rem;
  z-index: -1;

  img {
    width: 100%;
  }
}

.center {
  background-color: #fff;
  margin: 3.5rem 0.2rem;
  margin-bottom: 0;
  box-shadow: #ccc 0.1rem 0.1rem 0.8rem 0.1rem;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 1.4rem;
    position: relative;
    top: -0.4rem;
    border-radius: 50%;
  }

  div {
    margin-bottom: 0.4rem;
  }

  .name {
    font-weight: bold;
    font-size: 0.45rem;
  }

  .level {
    span {
      padding: 0 0.25rem;
      color: rgb(149, 144, 144);
      font-size: 0.28rem;
    }

    .fan {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  }

  .detail {
    span {
      border: 0.02rem solid #ccc;
      border-radius: 0.15rem;
      padding: 0.06rem;
      margin: 0 0.1rem;
      color: rgb(112, 109, 109);
    }
  }
}

.footer {
  color: rgb(107, 103, 103);

  .footer-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.8rem;

    .active {
      border-bottom: 0.1rem solid rgb(223, 86, 86);
    }
  }

  .footer-container {
    margin: 0 0.2rem;
    box-shadow: #ccc 0.1rem 0.1rem 0.8rem 0.1rem;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 0.2rem;
    padding-top: 0.2rem;

    .base {
      font-size: 0.4rem;
      font-weight: bold;
    }

    span {
      margin-bottom: 0.2rem;
    }
  }
}
</style>