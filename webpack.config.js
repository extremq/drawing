const path = require('path');

module.exports = {
  entry: './app/client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './app/client/public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
};
