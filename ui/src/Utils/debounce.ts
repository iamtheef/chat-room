export function debounce(callback: any, delay: number) {
  let timeout: any;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}
