const common = require('./webpack.common.js');

module.exports = Object.assign(common, {

  devServer: {
    host: '0.0.0.0',
    contentBase: `./build`,
    disableHostCheck: true
  }

});
