const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: {
    colors: true,
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: { collapseWhitespace: false },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
        },
      ],
    }),
  ],
};
