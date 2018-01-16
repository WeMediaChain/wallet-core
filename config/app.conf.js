/**
 * Created by Min on 2017/7/19.
 */
const path = require('path'),
    pkg = require('../package.json'),
    HOST = '0.0.0.0',
    PORT = process.argv[2] || 4040,
    ignorePkg = ['@', 'and', 'electron'];

module.exports = {
    apps: {
        entry: {
            dev: [
                `webpack-dev-server/client?http://${HOST}:${PORT}`, 'webpack/hot/only-dev-server', './src/index',
            ],
            prod: {
                app: './src/index',
                vendors: Object
                    .keys(pkg.dependencies)
                    .filter(val => !ignorePkg.includes(val)),
            },
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash:6].chunk.js',
            sourceMapFilename: '[name].bundle.map',
            publicPath: './',
        },
        devtool: {
            dev: 'eval-cheap-module-source-map',
            prod: 'hidden-source-map',
        },
    },
    devServer: {
        host: HOST,
        port: PORT,
    },
    proxy: {
        '*': {
            target: 'http://47.104.143.109:8545/',
            bypass() {
                return '/index.html';
            },
        },
    },
};
