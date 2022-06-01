import { Swipe, SwipeItem, Popup } from 'vant';

let plugins = [
  Swipe,
  SwipeItem,
  Popup
]

export function getVant(app:any){
  plugins.forEach((item) => {
    app.use(item)
  })
}