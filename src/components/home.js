import { css } from '@emotion/css';
import tw from 'twin.macro';

import { titleStyle } from '@/constants/styles';

import logo from '@/assets/logo-js.svg';

const gridStyle = css`
  ${tw`mt-6`}
  display: grid;
  grid-template-columns: 115px repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 0.6rem;
`;

export const Home = () => (
  <div className={gridStyle}>
    <img src={logo} />

    <div>
      <h1 className={titleStyle}>SolidJS Example</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>

    <div>
      <h2 className={titleStyle}>Others</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  </div>
);
