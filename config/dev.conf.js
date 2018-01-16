const webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    appConfig = require('./app.conf'),
    config = require('./base.conf');

module.exports = new WebpackDevServer(webpack(config), {
    compress: true,
    inline: true,
    hot: true,
    historyApiFallback: true,
    quiet: true,
    noInfo: true,
    stats: {
        colors: true
    },
    disableHostCheck: true,
    proxy: appConfig.proxy
}).listen(appConfig.devServer.port, appConfig.devServer.host, (err) => {
    if (err) {
        return console.log('run start error', err);
    }

    console.log(`Listen at http://${appConfig.devServer.host}:${appConfig.devServer.port}`);
});
