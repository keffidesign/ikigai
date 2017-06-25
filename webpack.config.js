module.exports = {

  entry: {
    app: `./src`,
    vendor: [
      `./vendor/utils`,
      `isomorphic-fetch`
    ]
  },

  output: {
    filename: `[name].js`,
    path: `/build`
  },

  resolve: {
    modules: [ `./src/core`, `./src/modules`, `node_modules`, `vendor` ]
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

  devServer: {
    host: '0.0.0.0',
    contentBase: `./build`
  }

};
