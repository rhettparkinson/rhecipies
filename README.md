# Rhecipies
A place for all my recipies online, built with Jekyll static-site generator.

## Project setup

If you have an existing Jekyll project and you want to install it elsewhere, you can follow these steps:

Clone your Jekyll project from GitHub or copy the project directory to your new location.

Make sure you have Ruby and Jekyll installed on your new machine. You can check if you have Ruby installed by running `ruby -v` in your terminal. You can install Jekyll by running `gem install jekyll bundler`.

Navigate to your Jekyll project directory in your terminal.

Install the required gems by running `bundle install`. This will install all the necessary gems and dependencies specified in your Gemfile.

Build your site by running `jekyll build`. This will generate your site in the _site directory.

Serve your site locally by running `jekyll serve --livereload`. This will start a local web server and you can view your site in your browser at http://localhost:4000.

## Webpack

Here's an example Webpack configuration.

Install the necessary packages:

```
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env --save-dev
```

This installs Webpack and its required packages, as well as Babel and its required packages for transpiling modern JavaScript syntax.

Create a webpack.config.js file in your project directory:

```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '_site/assets/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'my-module': path.resolve(__dirname, 'node_modules/my-module/my-module.js'),
    },
  },
};
```

In this configuration, we've added an alias for a module called my-module that's located in the node_modules folder. You can replace my-module with the name of the module you want to include in your bundle.

Add your JavaScript file to your src directory:

```
// src/index.js

import myModule from 'my-module';

console.log(myModule);
```

This assumes that your my-module module exports a function or object that you want to use in your code.

Update your HTML layouts to reference the bundled JavaScript file:

```
<script src="{{ site.baseurl }}/assets/js/main.js"></script>
```

This assumes that your Jekyll project's base URL is set to site.baseurl.

Run Webpack to build your JavaScript bundle:

```
npx webpack --config webpack.config.js
```

This will create a main.js file in the _site/assets/js directory.

Serve your site with Jekyll and Webpack:

```
bundle exec jekyll serve --livereload & npx webpack serve --open
```

This command will start both Jekyll and Webpack, with the Webpack development server running on http://localhost:8080. Changes to your JavaScript files will trigger a rebuild of the main.js file, which will be automatically updated in the browser.
