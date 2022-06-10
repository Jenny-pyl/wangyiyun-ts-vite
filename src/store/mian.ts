import { defineStore } from "pinia";
import { getMusicLyrics } from "@/network/api/item";
import { getPhoneLogin } from "@/network/api/home"

export const mainStore = defineStore('main', {
  state: () => {
    return {
      playList: [
        {
          al: {
            id: 36826,
            picUrl: "https://p2.music.126.net/9xK60ID8ozN56lrjZqpAVQ==/105553116282321.jpg",
          },
          ar: [{name: '青蛙乐队'}],
          id: 371362,
          name: '小跳蛙'
        }
      ],
      playListIndex: 0,
      isBtnShow: true, //暂停按钮的显示
      isDetailShow: false, //弹出框的显示
      lyricList: "", // 保存歌词字符串
      currentTime: 0,//歌曲播放当前时间
      totalSongTime: 0, //歌曲总时间
      isLogin: false, //判断是否登录
      isFooterShow: true, //底部组件是否显示
    }
  },
  getters: {},
  actions: {
    getLyric: async (value:any) => {
      let res = await getMusicLyrics(value)
      // console.log(res)
      return res.data.lrc.lyric
    },
    getLogin: async (value: any) => {
      console.log(value)
      let res = await getPhoneLogin(value)
      console.log(res)
    } 
  }
})