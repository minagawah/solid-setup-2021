import { compose } from 'ramda';

/**
 * String HEX --> HEX
 * @public
 */
export const str_to_hex = str => {
  let hex;
  if (typeof str === 'string' && str[0] === '#') {
    hex = str.slice(1);
  } else {
    hex = str | 0;
  }
  return parseInt(hex, 16);
};

export const strToHex = str_to_hex; // alias

/**
 * HEX --> String HEX
 * @public
 */
export const hex_to_str = hex => {
  let str;
  if (typeof hex === 'number') {
    const tmp = `00000${(hex | 0).toString(16)}`;
    str = `#${tmp.substr(-6)}`;
  } else {
    str = hex;
  }
  return str;
};

export const hexToStr = hex_to_str; // alias

/**
 * HEX --> RGB
 * @public
 */
export const hex_to_rgb = (hex, alpha = 1) => {
  const rgb = [];
  // eslint-disable no-bitwise
  rgb[0] = (hex >> 16) & 0xff;
  rgb[1] = (hex >> 8) & 0xff;
  rgb[2] = hex & 0xff;
  // eslint-enable no-bitwise
  alpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
  if (alpha === 1) {
    rgb[3] = alpha;
  }
  return rgb;
};

export const hexToRgb = hex_to_rgb; // alias

/**
 * String HEX --> RGB
 * @public
 */
export const str_to_rgb = compose(hex_to_rgb, str_to_hex);
export const strToRgb = str_to_rgb; // alias

/**
 * RGB --> HSL
 * @public
 */
export const rgb_to_hsl = (rgb = []) => {
  // console.log('[lib/color] ++++ rgb_to_hsl()');
  let [r, g, b] = rgb;
  console.log(`[lib/color] [R] ${r} [G] ${g} [B] ${b}`);

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
};

export const rgbToHsl = rgb_to_hsl; // alias

/**
 * HEX --> RGB --> HSL
 * @public
 */
export const hex_to_hsl = compose(rgb_to_hsl, hex_to_rgb);
export const hexToHsl = hex_to_hsl; // alias

/**
 * HSL --> RGB
 * @public
 */
export const hsl_to_rgb = (hsl = []) => {
  const h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];

  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  console.log(`[lib/color] [R] ${r} [G] ${g} [B] ${b}`);

  return [r, g, b];
};

export const hslToRgb = hsl_to_rgb; // alias

/**
 * @public
 */
export const rgb_to_str = (rgb = []) => {
  let [r, g, b] = rgb;

  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);

  if (hexR.length === 1) {
    hexR = `0${r}`;
  }
  if (hexG.length === 1) {
    hexG = `0${g}`;
  }
  if (hexB.length == 1) {
    hexB = `0${b}`;
  }

  return `#${hexR}${hexG}${hexB}`;
};

export const rgbToStr = rgb_to_str; // alias

/**
 * HSL --> RGB --> HEX
 * @public
 */
export const hsl_to_str = compose(rgb_to_str, hsl_to_rgb);
export const hslToStr = hsl_to_str; // alias
