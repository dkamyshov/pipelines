var path = require('path');
var HWP = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'awesome-typescript-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HWP({
      template: './src/index.html',
    }),
  ],
};
