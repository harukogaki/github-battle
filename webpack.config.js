var path = require('path');
var HTMLWebpachPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpachPlugin({
      template: 'app/index.html'
    })
  ]
}

//setup in package.json, lets us know if were running in production env
if (process.env.NODE_ENV === 'production'){
  config.plugins.push(
    //Apply some React optimizations specific for production
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
    }),

    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
