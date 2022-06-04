1、
使用vant组件库的van-popup组件未把该组件放在父组件的底部，出现 isDetailShow 两次变换（watch监听），原因：组件套组件，父级节点重新渲染就产生额外的 “副作用”。    
2、
```js
const { playList, playListIndex, isDetailShow, isBtnShow } = storeToRefs(store)
const curSong = playList.value[playListIndex.value]
```
上述代码不能实现响应式，应该使用computed（如下）：
```js
const curSong = computed(() => {
  return playList.value[playListIndex.value]
})
```
3、
main.ts中：
```js
getLyric: async (value:any) => {
      let res = await getMusicLyrics(value)
      // console.log(res)
      return res.data.lrc.lyric
    }
```
返回的是Promise，但凡是 async 函数，返回值会自动变成 Promise，应该用 await 就拆包
故而在FooterMusic.vue中:
```js
onMounted(() => {
  lyricList.value = store.getLyric(curSong.value.id)
})
```
写法错误，因为lyricList的type为String，不能将Promise的类型赋给String类型的变量。
应该改为：
```js
onMounted(async() => {
  lyricList.value = await store.getLyric(curSong.value.id)
})
```
