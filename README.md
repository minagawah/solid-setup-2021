# solid-setup-2021

Solid.js template project for my own.

[1. About](#1-about)  
[2. Overview of Solid.js App Development](#2-overview-of-solidjs-app-development)  
[3. Installed NPM Packages](#3-installed-npm-packages)  
&nbsp; &nbsp; [3-1. Babel](#3-babel)  
&nbsp; &nbsp; [3-2. Prettier](#3-prettier)  
&nbsp; &nbsp; [3-3. Webpack](#3-webpack)  
&nbsp; &nbsp; [3-4. CSS](#3-css)  
&nbsp; &nbsp; [3-5. Jest](#3-jest)  
&nbsp; &nbsp; [3-6. Other Dependencies](#3-other-dependencies)  
[4. Notes](#4-notes)  
[5. LICENSE](#5-license)

## 1. About

I created last year a sample project,
[solidjs-emotion-tailwind](https://github.com/minagawah/solidjs-emotion-tailwind),
but a lot has changed since then.  
This is more like a personal template for my own when using Solid.js.

## 2. Overview of Solid.js App Development

### 2-1. Use `css` not from `twin.macro`, but from Emotion

So, my major concern is about integrating
[Emotion](https://emotion.sh/docs/introduction)
and [twin.macro](https://github.com/ben-rogerson/twin.macro)
(or [TailwindCSS](https://tailwindcss.com/))
into a Solid.js app.

In a nutshell, when making a Solid.js app,
you may not do this:

```js
import tw, { css } from 'twin.macro';
...
...
  return (
    <Nav css={[tw`bg-red-500 w-full`, anotherStyle]} />
  );
```

Basically, you are not allowed to use `css` for component properties,
but must use `className`.  
`css` macro (as a prop) is very handy, but it requires `@emotion/react`.  
Instead, you must do this:

```js
import { cx, css } from '@emotion/css';
import tw from 'twin.macro';
...
...
  return (
    <Nav className={cx(
        css(tw`bg-red-500 w-full`),
        anotherStyle
      )}
    />
  );
```

As you can see, the ideas is to not to import `css` from `twin.macro`,
but use the original `css` from `@emotion/css`.

### 2-2. Replace `createResourceState` with `createState`

`createResourceState` is now deprecated.

Here is what I had previously for a store provider:

```js
const [state, loadState, setState] = createResourceState(initialState);
const store = [state, initialAction];
```

instead, I need this:

```js
const [state, setState] = createState(initialState);
const store = [state, initialAction];
```

### 2-3. Other Updates

I guess I'll add more as I notice something.

## 3. Installed NPM Packages

Although I will explain for details later, here are all the NPM packages:

```
yarn add --dev core-js@3 @babel/core @babel/cli @babel/runtime-corejs3 @babel/preset-env babel-preset-solid babel-plugin-macros babel-jest prettier pretty-quick webpack webpack-cli webpack-dev-server file-loader babel-loader css-loader style-loader postcss-loader postcss autoprefixer @emotion/css @emotion/babel-plugin tailwindcss twin.macro webpack-merge html-webpack-plugin mini-css-extract-plugin copy-webpack-plugin clean-webpack-plugin license-webpack-plugin jest

yarn add solid-js @rturnq/solid-store ramda
```

##### devDependencies:

- core-js@3
- @babel/core
- @babel/cli
- @babel/runtime-corejs3
- @babel/preset-env
- babel-preset-solid
- babel-plugin-macros
- babel-jest
- prettier
- pretty-quick
- webpack
- webpack-cli
- webpack-dev-server
- file-loader
- babel-loader
- css-loader
- style-loader
- postcss-loader
- postcss
- autoprefixer
- @emotion/css
- @emotion/babel-plugin
- tailwindcss
- twin.macro
- webpack-merge
- html-webpack-plugin
- mini-css-extract-plugin
- copy-webpack-plugin
- clean-webpack-plugin
- license-webpack-plugin
- jest

##### dependencies:

- solid-js
- @rturnq/solid-store
- ramda

Now, I will categorize the above by purpose, and leave some notes:

### 3-1. Babel

`@babel/polyfill` has been deprecated, we use `core-js`.

- core-js@3
  - For `@babel/polyfill` has been deprecated.
- @babel/core
- @babel/cli
- @babel/runtime-corejs3
- @babel/preset-env
  - `useBuiltIns: 'usage'` in `babel.config.js` will automatically insert polyfills.
- babel-preset-solid
- babel-plugin-macros
  - Needed for Emotion
- babel-loader
  - Always handy having definitions in `.babelrc` (or `babel.config.js`).

### 3-2. Prettier

- prettier
- pretty-quick

```
yarn add --dev prettier pretty-quick
```

In `.prettierignore`, make sure to define `*.js` files you want Prettier to ignore.

### 3-3. Webpack

- webpack
- webpack-cli
- webpack-dev-server
- file-loader
- webpack-merge
- html-webpack-plugin
  - Template is in `src/index.html`, and outputs `dist/index.html`.
- copy-webpack-plugin
  - Just to copy `src/assets` to `dist/assets`.
- clean-webpack-plugin
- license-webpack-plugin
  - Extracts license information for production.

### 3-4. CSS

#### Emotion + Tailwind via `twin.macro`

- @emotion/css
- @emotion/babel-plugin
- tailwindcss
- twin.macro

#### CSS Build Tools

Although `autoprefixer` and `normalize` are already in `tailwindcss`, we need `autoprefixer` when PostCSS loads CSS in Webpack process.

- css-loader
- style-loader
  - This is for development only. For production, we are using `mini-css-extract-plugin`.
- postcss-loader
  - We definitely need this when using Tailwind.
- postcss
  - We definitely need this when using Tailwind.
- autoprefixer
- mini-css-extract-plugin
  - While we are extracting CSS files, and write them to disks, this is for production only.

### 3-5. Jest

- jest
- babel-jest

Run the following:

```
$ npx jest --init
```

### 3-6. Other Dependencies

- solid-js
- @rturnq/solid-store
- ramda
  - Makes our lives easier for functional programming.

## 4. Notes

## 5. License

Dual-licensed under either of the followings.  
Choose at your option.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))
