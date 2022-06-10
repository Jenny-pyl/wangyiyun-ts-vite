<script setup lang="ts">
import FooterMusic from "./components/common/FooterMusic.vue"
import { mainStore } from "./store/mian"
import { storeToRefs } from "pinia";
const store = mainStore()
const { isFooterShow } = storeToRefs(store)
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="itemMusic">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <FooterMusic v-show="isFooterShow"/>
</template>

<style scoped>

</style>
