import { cx, css } from '@emotion/css';
import tw from 'twin.macro';

import { linkStyle, logoLinkStyle, otherLinkStyle } from '@/constants/styles';

export const Header = () => (
  <header
    className={css(
      tw`flex flex-row flex-nowrap justify-start content-center items-stretch`
    )}
  >
    <a href="#top" className={cx(linkStyle, logoLinkStyle)}>
      SolidJS
    </a>
    <a
      href="#settings"
      className={cx(css(tw`ml-3`), linkStyle, otherLinkStyle)}
    >
      Settings
    </a>
  </header>
);
