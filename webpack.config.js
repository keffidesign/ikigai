module.exports = {

  entry: {
    app: './src/app.js'
  },

  output: {
    filename: '[name].js',
    path: '/build'
  },

  devServer: {
    contentBase: './build'
  }

};
