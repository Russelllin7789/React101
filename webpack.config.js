const path = require('path')

module.exports = {
  entry: {
    'App': './jsx/App.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}