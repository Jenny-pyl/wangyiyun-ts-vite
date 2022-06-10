export interface IMusicList {
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
}

export interface ICreator {
  avatarUrl: string
  nickname: string
}
export interface IPlayList {
  id?: number
  coverImgUrl?: string
  description?: string
  name?: string
  playCount: number
  creator?: ICreator
  shareCount?: number
  commentCount? : number
  subscribedCount: number
}

export interface IAl {
  id: number
  picUrl: string
}
export interface IAr {
  id: number
  name: string
  img1v1Url: string
}
export interface ISongs {
  id: number
  name: string
  al: IAl
  ar: Array<IAr>
  artists: Array<IAr>
  mv: number
  mvid: number
  album: any
}

export interface IUserInfo {
  backgroundUrl: string
  avatarUrl: string
  nickname: string
  follows: number
  followeds: number
  gender: 1 | 2
  signature: string
}