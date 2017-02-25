var webpack = require('webpack');

module.exports = {
  // entry: './client/scripts/client.js', 
  // {
  //   app:'./client/scripts/client.js'
  //   // ,vendor: ['angular']
  // }
  output: {
    path: __dirname + '/server/public'
    ,filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // query: {
        //   presets: ['es2015', 'stage-2']
        // }
      }
    ]
  }
  // ,plugins: [
  //       new webpack.optimize.UglifyJsPlugin({
  //         // sourceMap: true,
  //         compress:{
  //           warnings: false
  //         }
  //       })
  //   ]
  
  ,devtool: 'eval-source-map' 
  // ,devtool: 'cheap-module-source-map' //use this for prod
}
