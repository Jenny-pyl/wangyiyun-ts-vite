<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const isActive = ref(true)
const router = useRouter()

const search = () => {
  router.push('/search')
}

const clickToUserInfo = () => {
  router.push('/userInfo')
}
</script>

<template>
  <div class="top-nav">
    <div class="left">
      <i class="iconfont icon-caidanlan"></i>
    </div>
    <div class="center">
      <span @click="clickToUserInfo">我的</span>
      <span :class="{ active: isActive }">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="right">
      <i class="iconfont icon-sousuo" @click="search"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iconfont {
  font-size: .6rem;
}
.top-nav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .center {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;
  }
}

.active {
  font-weight: bold;
}
</style>