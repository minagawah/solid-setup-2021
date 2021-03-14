/** @prettier */

import { onCleanup } from 'solid-js';

import { useDebounce } from '@/hooks/debounce';

const DEBOUCNE_MSEC = 250;

const screenSize = () => ({
  width: window.innerWidth || 0,
  height: window.innerHeight || 0,
});

export const createScreenSize = ({ store, setState }) => {
  // "actions" have previously defined actions.
  const [, actions] = store;
  const [setDebounce, cancelDebounce] = useDebounce();

  const setScreenSize = () => {
    setState(screenSize());
  };

  window.addEventListener('resize', setDebounce(setScreenSize, DEBOUCNE_MSEC));

  onCleanup(() => {
    window.removeEventListener('resize', setScreenSize);
    cancelDebounce();
  });

  // Add new actions to previously defined "actions".
  store[1] = {
    ...actions,
    setScreenSize,
  };
};
