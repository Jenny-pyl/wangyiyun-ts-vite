import { defineStore } from "pinia";

export const mainStore = defineStore('main', {
  state: () => {
    return {
      playList: [
        {
          al: {
            id: 36826,
            picUrl: "https://p2.music.126.net/9xK60ID8ozN56lrjZqpAVQ==/105553116282321.jpg",
          },
          id: 371362,
          name: '小跳蛙'
        }
      ],
      playListIndex: 0,
      isBtnShow: true, //暂停按钮的显示
    }
  },
  getters: {},
  actions: {}
})