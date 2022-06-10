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

//登录/login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin(data:any) {
  return service({
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}

//获取用户详情/user/detail?uid=32953014
export function getUserInfo(data:any) {
  return service({
    method: 'GET',
    url: `/user/detail?uid=${data}`
  })
}