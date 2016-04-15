// Base client-side webpack configuration
const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
  // the project dir
  context: __dirname,
  entry: {
    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    vendor: [
      'babel-polyfill',
      'jquery',
      'react-dom',
      'react-dom/server',
      'react',
    ],
    // Main component entry file: components.jsx
    app: [
      './app/assets/javascripts/components',
    ],
  },
  // Extensions to resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor',
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [

      // For react-rails we need to expose these deps to global object
      { test: require.resolve('jquery'), loader: 'expose?jQuery' },
      { test: require.resolve('jquery'), loader: 'expose?$' },
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-dom'), loader: 'expose?ReactDOM' },
      { test: require.resolve('react-dom/server'), loader: 'expose?ReactDOMServer' }
    ],
  },
};
