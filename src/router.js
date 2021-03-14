import { createSignal, onCleanup, createContext, useContext } from 'solid-js';

const RouterContext = createContext({});

/**
 * @returns {Array} - [store, action]
 */
export const useRouter = () => useContext(RouterContext);

export const RouteProvider = props => {
  if (!props.router) return null;

  return (
    <RouterContext.Provider value={props.router}>
      {props.children}
    </RouterContext.Provider>
  );
};

/**
 * @name {RouteHandler}
 * @example
 * const router = createRouteHandler({ defaultPage: 'top' });
 * const { match } = router;
 * <Match when={match(/^top/)}>
 */
export const createRouteHandler = ({ defaultPage }) => {
  const [location, setLocation] = createSignal(
    window.location.hash.slice(2) || defaultPage
  );
  const [read, triggerParams] = createSignal();

  // A listener for `hashchange` event.
  const handler = () => {
    setLocation(window.location.hash.slice(1));
  };

  let params;

  window.addEventListener('hashchange', handler);

  onCleanup(() => {
    window.removeEventListener('hashchange', handler);
    params = void 0;
  });

  /**
   * @typedef RouteHandler
   * @implements ImplRouteHandler
   */

  /**
   * @interface ImplRouteHandler
   */
  const self = {
    /**
     * @property
     * @name ImplRouteHandler#location
     */
    location,

    /**
     * @function
     * @name ImplRouteHandler#match
     * @param {Object} matchPath - RegExp
     * @returns {bool}
     */
    match: matchPath => {
      const loc = location().split('?')[0];
      const match = matchPath.exec(loc);

      if (match) {
        params = { params: match.slice(1) };
        triggerParams();
      }

      return !!match;
    },

    /**
     * @todo: Consider revising the comma operator.
     * @function
     * @name ImplRouteHandler#getParams
     * @param {Object} matchPath - RegExp
     * @returns {bool}
     */
    getParams: () => (read(), params),
  };

  return self;
};
