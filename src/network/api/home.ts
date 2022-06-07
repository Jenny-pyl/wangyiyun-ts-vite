import service from '../index'

// 获取首页轮播图的数据
export function getBanners() {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}

// 获取发现好歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}

//搜素获取歌手歌曲
export function getSearchMusic(data:any) {
  return service({
    method: 'GET',
    url: `/search?keywords=${data}`
  })
}