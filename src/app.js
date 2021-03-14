import tw from 'twin.macro';

import { useStore } from '@/store';
import { RouteProvider, createRouteHandler } from '@/router';

import { Loading } from '@/components/loading';
import { Header } from '@/components/header';
import { Home } from '@/components/home';
import { Settings } from '@/components/settings';

import './styles.css';

export const App = () => {
  const [, actions] = useStore();

  const router = createRouteHandler({ defaultPage: 'home' });
  const { match } = router;

  // Set the initial screen size.
  actions.setScreenSize();

  console.log(`[App] ${actions.getMessage()}`);

  return (
    <RouteProvider router={router}>
      <Header />
      <Suspense fallback={<Loading tw="mt-6 ml-6" />}>
        <Switch fallback={<Home />}>
          <Match when={match(/^home/)}>
            <Home />
          </Match>
          <Match when={match(/^settings/)}>
            <Settings />
          </Match>
        </Switch>
      </Suspense>
    </RouteProvider>
  );
};
