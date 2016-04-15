// Run like this:
// npm run build:dev:client
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

// NOTE: All others assets are handles by rails asset pipeline,
// We use webpack just for bundling the deps and our app for browser

const webpack = require('webpack');
const config = require('./webpack.client.base.config');
const devBuild = process.env.NODE_ENV !== 'production';

// Outputs the app-bundle.js into /webpack folder under assets
config.output = {
  filename: '[name]-bundle.js',
  path: './app/assets/webpack',
};

// The es5-shim/sham is for capybara testing
config.entry.vendor.unshift(
  'es5-shim/es5-shim',
  'es5-shim/es5-sham'
);

// jquery-ujs depends on jquery so much be
config.entry.vendor.push('jquery-ujs');

// See webpack.common.config for adding modules common to both the webpack dev server and rails
config.module.loaders.push(
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: require.resolve('react'),
    loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
  },
  {
    test: require.resolve('jquery-ujs'),
    loader: 'imports?jQuery=jquery',
  }
);

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
