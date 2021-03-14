/** @prettier */

import { createContext, useContext, createState } from 'solid-js';

import { createCommon } from './createCommon';
import { createScreenSize } from './createScreenSize';
import { createSecret } from './createSecret';

const StoreContext = createContext();

const initialState = { secret: '1234' };
const initialAction = {};

export const StoreProvider = props => {
  const [state, setState] = createState(initialState);
  const store = [state, initialAction];

  createCommon({ store, setState });
  createScreenSize({ store, setState });
  createSecret({ store, setState });

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
