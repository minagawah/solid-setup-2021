export const useDebounce = () => {
  let timerId = null;
  let args = void 0;
  let started = null;
  let elapsed = 0;

  const reset = () => {
    timerId = null;
    args = void 0;
    started = null;
    elapsed = 0;
  };

  const cancel = () => {
    if (timerId) {
      elapsed = new Date() - started;
      // console.log(`[debounce] Canceled after ${elapsed}msec`);
      clearTimeout(timerId);
      reset();
    }
  };

  // Runs only when explicitly called for cleanup.
  const cancelDebounce = () => {
    cancel();
  };

  const setDebounce = (f, wait = 0, ctx = null) => {
    const g = () => {
      // This polifills to: Function.prototype.apply.call(f, ctx, args);
      Reflect.apply(f, ctx, args);
      reset();
    };

    return function () {
      // When still running, cancel the previous (so that
      // the previous won't run), and register a new timer.
      if (timerId) cancel();

      ctx = ctx || this || {};
      args = arguments;
      started = new Date();
      timerId = setTimeout(g, wait);
    };
  };

  return [setDebounce, cancelDebounce];
};
