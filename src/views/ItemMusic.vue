<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getMusicItemList, getSongList } from '@/network/api/item'

import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
import { IPlayList, ICreator, ISongs, IAr, IAl } from '@/utils/types';

const id = ref("0")
const route = useRoute()
const playList = ref<IPlayList>({playCount: 0, subscribedCount: 0})
const songs = ref<ISongs[]>([])
onMounted(async() => {
  id.value = route.query.id as string
  //获取歌单详情
  const res = await getMusicItemList(id.value)
  playList.value = res.data.playlist
  // console.log(playList)
  //获取歌单歌曲
  const result = await getSongList(id.value)
  console.log(result)
  songs.value = result.data.songs
  //防止页面刷新，数据丢失，将数据保存到sessionStorage
  sessionStorage.setItem('itemDetail', JSON.stringify(playList.value))
})
</script>

<template>
  <ItemMusicTop :playList="playList"/>
  <ItemMusicList :songs="songs" :subscribedCount="playList.subscribedCount"/>
</template>

<style lang="less" scoped>
</style>