import service from ".."

//获取歌单详情页数据
export function getMusicItemList(id: string) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}

//获取歌单歌曲
export function getSongList(id: string) {
  return service({
    method: 'GET',
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}

//获取歌曲歌词
export function getMusicLyrics(id: any) {
  return service({
    method: 'GET',
    url: `/lyric?id=${id}`
  })
}