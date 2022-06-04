<script lang="ts" setup>
</script>

<template>
  <div class="icon-list">
    <div class="icon-item">
      <i class="iconfont icon-tuijian"></i>
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg> -->
      <span>每日推荐</span>
    </div>
    <div class="icon-item">
      <i class="iconfont icon-shouyinji"></i>
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji"></use>
      </svg> -->
      <span>私人FM</span>
    </div>
    <div class="icon-item">
      <i class="iconfont icon-gedan"></i>
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg> -->
      <span>歌单</span>
    </div>
    <div class="icon-item">
      <i class="iconfont icon-paihangbang"></i>
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg> -->
      <span>排行榜</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iconfont {
  font-size: 1rem;
  color: rgb(220, 28, 28);
}
.icon-list {
  width: 100%;
  height: 1.6rem;
  margin-top: .2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon-item {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>