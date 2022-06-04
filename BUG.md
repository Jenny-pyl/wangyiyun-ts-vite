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
4、
MusicDetail中：
```js
watch(playListIndex, () => {
    musicLyric && (musicLyric.value.scrollTop = 0)
})
```
**想要实现的效果**：实现切换上下首后歌词容器musicLyric的scrollTop也改变。
**结果**：不可行。
**分析**：watch函数（回调函数是同步操作的）在playListIndex改变后立即执行，此时浏览器并未完成渲染，则&&前musicLyric未完拿到数据，于是&&后面的(musicLyric.value.scrollTop = 0)不执行，且由于在当前playListIndex改变后只执行一次，就算过一段时间musicLyric渲染完成，&&后面语句也不执行。
**总结**：watch监听playListIndex改变发生在musicLyric拿到数据前。
**思路**：把回调函数封装为异步操作，使得watch整体异步。
代码改为：
```js
watch(playListIndex, () => {
  setTimeout(() => {
    // musicLyric && (musicLyric.value.scrollTop = 0)
    musicLyric.value.scrollTop = 0
  },20)
})
```
