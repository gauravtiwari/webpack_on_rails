# Webpack on Rails example application (with server rendering)
Minimal and Simple setup to use webpack with Rails asset pipeline for React and ES6.

Check out the `app/assets/javascripts` folder
```bash
components: Contains all react components splitted in directories (same namespace as rails views)
components.js: components manifest
```
## Features
* React with ES6 syntax
* Babel transpiler
* Webpack - possibilities are endless
* Basic ActionCable integration
* NPM support

## Running
```bash
git clone git@github.com:gauravtiwari/webpack_on_rails.git
cd webpack_on_rails
bundle install
npm install
chmod 777 start
./start
# Or Alternatively
bundle exec foreman start
```