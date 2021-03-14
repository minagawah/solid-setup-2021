import { css } from '@emotion/css';
import tw from 'twin.macro';

import {
  black,
  white,
  darkgray,
  pink,
  yellow,
  greenyellow,
} from '@/constants/colors';

export const titleStyle = css`
  ${tw`mt-4 mb-2 font-bold`}
  display: block;
  font-size: 1.4rem;
  color: ${white};
`;

const col = css(
  tw`flex flex-col flex-nowrap justify-center content-center items-center`
);

export const linkStyle = css`
  ${tw`p-1 font-bold`}
  ${col}
  font-size: 0.9em;
`;

export const logoLinkStyle = css`
  background-color: ${pink};
  &:link,
  &:visited {
    color: ${darkgray};
  }
  &:hover,
  &:active {
    background-color: ${greenyellow};
    color: ${darkgray};
    text-decoration: none;
  }
`;

export const otherLinkStyle = css`
  width: auto;
  background-color: ${yellow};
  &:link,
  &:visited {
    color: ${black};
  }
  &:hover,
  &:active {
    color: ${black};
    background-color: ${greenyellow};
    text-decoration: none;
  }
`;

export const padding = css(tw`p-1 pl-4 pr-4`);

export const buttonStyle = css`
  ${tw`border-none text-center font-bold`}
  ${padding}
  background-color: ${pink};
  min-width: 90px;
`;

export const inputStyle = css`
  ${tw`border-none font-bold`}
  ${padding}
`;
