module.exports = {

  entry: {
    app: `./src/app.js`,
    vendor: [
      `./vendor/utils`,
      `isomorphic-fetch`,
      `moment`
    ]
  },

  output: {
    filename: `[name].js`,
    path: `${__dirname}/build`
  },

  resolve: {
    modules: [
      `./src/core`,
      `./src/modules`,
      `./node_modules`,
      `./vendor`
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          `node_modules`,
          `vendor`
        ],
        loader: `babel-loader`,
        options: {
          presets: [
            `stage-0`
          ]
        }
      },
      {
        test: /\.html$/,
        exclude: [
          `node_modules`,
          `vendor`
        ],
        loader: `html-loader`
      },
      {
        test: /\.json$/,
        use: `json-loader`
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
            }
          }
        ]
      }
    ]
  },

};
