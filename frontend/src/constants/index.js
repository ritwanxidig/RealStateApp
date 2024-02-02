export function tbmkFormatter(num) {
  // if it reaches 1t
  if (num >= 999999999999) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "t";
  }
  // if it reaches 1b
  if (num >= 999999999) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  // if it reaches 1m
  if (num >= 999999) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  // if it reaches 1k
  if (num >= 999) {
    return (num / 100).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
}
