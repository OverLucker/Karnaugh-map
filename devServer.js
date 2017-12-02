'use strict';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.babel');

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.devServer.port, '127.0.0.1', (err) => {
  if (err) {
    console.log(err);
  }
  // если заходить через localhost отваливаются шрифты и тд,  Same Origin Policy
  console.log('Listening at 127.0.0.1:' + config.devServer.port);
});
