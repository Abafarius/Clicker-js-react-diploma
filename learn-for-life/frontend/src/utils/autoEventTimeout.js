// utils/autoEventTimeout.js
let timer = null;

export function startAutoEventTimeout(callback, onTick, duration = 15) {
  let remaining = duration;
  timer = setInterval(() => {
    remaining--;
    if (onTick) onTick(remaining);
    if (remaining <= 0) {
      clearInterval(timer);
      callback();
    }
  }, 1000);
}

export function clearAutoEventTimeout() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
