export function delayAsyncFunction(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
