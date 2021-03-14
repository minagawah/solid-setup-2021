/** @prettier */

export const createCommon = ({ store, setState }) => {
  // "actions" have previously defined actions.
  const [state, actions] = store;

  const getMessage = () => 'Life is beautiful...';

  // Add new actions to previously defined "actions".
  store[1] = {
    ...actions,
    getMessage,
  };
};
