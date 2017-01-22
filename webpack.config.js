module.exports = {
  entry: './client/scripts/client.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
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
  // ,devtool: 'eval-source-map'
}
