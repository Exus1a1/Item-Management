// 节流函数
export function throttle(func: () => void, delay: number): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastExecTime = 0

  return function () {
    const currentTime = Date.now()
    const elapsedTime = currentTime - lastExecTime

    if (elapsedTime > delay) {
      func()
      lastExecTime = currentTime
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(func, delay - elapsedTime)
    }
  }
}
