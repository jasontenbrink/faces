var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: 
  {
    app:'./client',
    login: './client/login'
    // ,vendor: ['angular']
  },
  output: {
    path: __dirname + '/server/public'
    ,filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(jpg|png)$/,
        loader: "url-loader"
      }
    ]
  }
  ,plugins: [
    new Dotenv()
        // ,new webpack.optimize.UglifyJsPlugin({
        //   // sourceMap: true,
        //   compress:{
        //     warnings: false
        //   }
        // })
  ]
  
  ,devtool: 'eval-source-map' 
  // ,devtool: 'cheap-module-source-map' //use this for prod
}
