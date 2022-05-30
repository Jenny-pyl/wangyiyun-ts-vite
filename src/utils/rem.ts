function remSize():void {
  //获取设备宽度
  var deviceWith = document.documentElement.clientWidth || window.innerWidth
  if(deviceWith >= 750) {
    deviceWith = 750
  }
  if(deviceWith <= 320) {
    deviceWith = 320
  }
  document.documentElement.style.fontSize = (deviceWith / 7.5) + 'px'
  //加入!表示让ts不用担心，body元素是一定会有的
  document.querySelector('body')!.style.fontSize = 0.3 + 'rem'
}
remSize()
window.onresize = function() {
  remSize()
}

export {}