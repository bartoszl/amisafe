var path = require('path');

module.exports = {
  entry: [
    './client/src/index.js'
  ],

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: [
        path.resolve(__dirname, "client/src"),
      ],
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    contentBase: "./public"
  }
};
