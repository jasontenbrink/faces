module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'client.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  devServer: {
    contentBase: './src'
  },
  devtool: 'eval-source-map'
}
