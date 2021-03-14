/** @prettier */

import { createEffect } from 'solid-js';

export const createSecret = ({ store, setState }) => {
  // "actions" have previously defined actions.
  const [state, actions] = store;

  const getFromLocalStorage = () => localStorage.getItem('secret');
  const setLocalStorage = secret => localStorage.setItem('secret', secret);
  const removeLocalStorage = () => localStorage.removeItem('secret');

  let checked = false;

  const localSecret = getFromLocalStorage();
  if (localSecret) {
    setState({ secret: localSecret });
  }
  checked = true;

  /**
   * Because "createEffect" runs at the initial startup,
   * it overwrites (with default "1234") the value
   * already saved in the local storage. To prevent this
   * from happening, we are checking (using "getFromLocalStorage")
   * to see if we already have anything saved in the local storage.
   * However, because of this, it would not allow us to save
   * new values forever. Thus, we have "checked"
   * to allow us to save new values from the second time onward.
   */
  createEffect(() => {
    if (!getFromLocalStorage() || checked) {
      if (state.secret) {
        setLocalStorage(state.secret);
      } else {
        removeLocalStorage();
      }
    }
  });

  // Add new actions to previously defined "actions".
  store[1] = {
    ...actions,
    setSecret: (secret = '') => {
      setState({ secret });
      setLocalStorage(secret);
    },
    removeSecret: () => {
      setState({ secret: null });
      removeLocalStorage();
    },
  };
};
