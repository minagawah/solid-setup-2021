const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = require('./webpack.base.js');

const stringify = data =>
  Object.keys(data).reduce((acc, key) => {
    if (data[key]) {
      acc[key] = JSON.stringify(data[key]);
    }
    return acc;
  }, {});

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
  target: 'web',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
