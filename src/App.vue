<script setup lang="ts">
import FooterMusic from "./components/common/FooterMusic.vue"
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="itemMusic">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <FooterMusic/>
</template>

<style scoped>

</style>
