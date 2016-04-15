// Webpack configuration for server bundle

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
  // the project dir
  context: __dirname,

  entry: [
    'babel-polyfill',
    'react-dom/server',
    'react',
    './app/assets/javascripts/components',
  ],
  output: {
    filename: 'server-bundle.js',
    path: './app/assets/webpack',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6.js'],
    alias: {
      lib: path.join(process.cwd(), 'app', 'lib'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: require.resolve('jquery'), loader: 'expose?jQuery' },
      { test: require.resolve('jquery'), loader: 'expose?$' },
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-dom'), loader: 'expose?ReactDOM' },
      { test: require.resolve('react-dom/server'), loader: 'expose?ReactDOMServer' }
    ],
  },
};
