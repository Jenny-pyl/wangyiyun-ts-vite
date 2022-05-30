import { Swipe, SwipeItem } from 'vant';

let plugins = [
  Swipe,
  SwipeItem
]

export function getVant(app:any){
  plugins.forEach((item) => {
    app.use(item)
  })
}