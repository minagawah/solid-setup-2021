const noop = () => {};

export const useMouse = (params = {}) => {
  const mouse = {
    x: 0,
    y: 0,
  };

  let el;

  let inProgress = false;
  let start;
  let end;

  let duration = 100;

  let mouseDownCallback = noop;
  let mouseUpCallback = noop;
  let mouseMoveCallback = noop;

  const clear = () => {
    start = end = void 0;
  };

  const execCallback = (cb, args) => {
    if (typeof cb === 'function') {
      cb(args);
    }
  };

  const assignPos = (f = noop) => (o, event) => {
    if (f && o) {
      const { x = 0, y = 0 } = f(event) || {};
      o.x = x;
      o.y = y;
    }
  };

  /*
   * =======================================
   * Mouse Events
   * =======================================
   */

  const getMousePosition = event => {
    if (!el || !event) return;

    let x;
    let y;

    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= el.offsetLeft;
    y -= el.offsetTop;

    return { x, y };
  };

  const mouseDownHandler = event => {
    if (!el) return;
    event.preventDefault();
    assignPos(getMousePosition)(mouse, event);
    execCallback(mouseDownCallback, event);
  };

  const mouseUpHandler = event => {
    if (!el) return;
    event.preventDefault();
    execCallback(mouseUpCallback, event);
  };

  const mouseMoveHandler = event => {
    if (!el) return;

    assignPos(getMousePosition)(mouse, event);
    execCallback(mouseMoveCallback, event);
  };

  /*
   * =======================================
   * Touche Events
   * =======================================
   */

  const getTouchPosition = event => {
    if (!el || !event || !inProgress) return;

    let x;
    let y;

    const { touches = [] } = event;
    const [touch = {}] = touches;

    x = touch.clientX || 0;
    y = touch.clientY || 0;
    x -= el.offsetLeft;
    y -= el.offsetTop;

    return { x, y };
  };

  const touchStartHandler = event => {
    event.preventDefault();

    inProgress = true;
    start = new Date().getTime();

    assignPos(getTouchPosition)(mouse, event);
    execCallback(mouseDownCallback, event);
  };

  const touchEndHandler = event => {
    event.preventDefault();

    inProgress = false;
    end = new Date().getTime();

    const delta = end - start;
    if (delta > duration) {
      clear();
    }

    execCallback(mouseUpCallback, event);
  };

  const touchMoveHandler = event => {
    if (!el || !inProgress) return;
    assignPos(getTouchPosition)(mouse, event);
    execCallback(mouseMoveCallback, event);
  };

  const setMouse = (element, options = {}) => {
    if (element) {
      ({
        duration = 100,
        onMouseDown: mouseDownCallback,
        onMouseUp: mouseUpCallback,
        onMouseMove: mouseMoveCallback,
      } = options);

      el = element;
      // Mouse Events
      el.addEventListener('mousedown', mouseDownHandler, false);
      el.addEventListener('mouseup', mouseUpHandler, false);
      el.addEventListener('mousemove', mouseMoveHandler, false);
      // Touch Events
      el.addEventListener('touchstart', touchStartHandler, false);
      el.addEventListener('touchend', touchEndHandler, false);
      el.addEventListener('touchmove', touchMoveHandler, false);
    }
    return mouse;
  };

  const removeMouse = () => {
    if (el) {
      // Mouse Events
      el.removeEventListener('mousedown', mouseDownHandler);
      el.removeEventListener('mouseup', mouseUpHandler);
      el.removeEventListener('mousemove', mouseMoveHandler);
      // Touch Events
      el.removeEventListener('touchstart', touchStartHandler);
      el.removeEventListener('touchend', touchEndHandler);
      el.removeEventListener('touchmove', touchMoveHandler);

      mouseDownCallback = noop;
      mouseUpCallback = noop;
      mouseMoveCallback = noop;
    }
  };

  return [setMouse, removeMouse];
};
