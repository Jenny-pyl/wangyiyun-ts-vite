export function handleBigNum(num: number): string {
  if(num >= 10000000) {
    return (num/10000000).toFixed(2) + '千万'
  } else if(num >= 10000) {
    return (num/10000).toFixed(2) + '万'
  }else {
    return num.toString()
  }
}