import { cx, css } from '@emotion/css';
import tw from 'twin.macro';

import { useStore } from '@/store';
import { darkgray, yellow } from '@/constants/colors';
import {
  padding,
  titleStyle,
  buttonStyle,
  inputStyle,
} from '@/constants/styles';

const wrapperStyle = css(
  tw`mt-2 flex flex-row flex-nowrap justify-start content-center items-center`
);

const secretStyle = css`
  ${tw`text-center font-bold`}
  ${padding}
  background-color: ${yellow};
  color: ${darkgray};
`;

export const Settings = () => {
  const [store, actions] = useStore();

  let ref;

  const removeSecret = () => actions.removeSecret();

  const setSecret = () => {
    const { value } = ref || {};
    if (value) {
      actions.setSecret(value);
    }
  };

  return (
    <>
      <h2 className={titleStyle}>Settings</h2>

      <p>Set or reset the secret code in Local Storage.</p>

      <div className={wrapperStyle}>
        <div className={secretStyle}>
          <Show when={store.secret} fallback="(no secret)">
            {store.secret}
          </Show>
        </div>
        <button
          className={cx(css(tw`ml-2`), buttonStyle)}
          onClick={removeSecret}
        >
          Reset
        </button>
      </div>

      <div className={wrapperStyle}>
        <input
          ref={ref}
          type="text"
          value={store.secret}
          className={inputStyle}
        />
        <button className={buttonStyle} onClick={setSecret}>
          Set
        </button>
      </div>
    </>
  );
};
