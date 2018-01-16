/**
 * Created by Min on 2017/7/19.
 */
const path = require('path'),
    pkg = require('../package.json'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    name: 'vendor',
    entry: Object.keys(pkg.dependencies).filter(val => val !== 'electron'),
    output: {
        path: path.join(__dirname, '../public/dll'),
        filename: '[name].js',
        library: 'vendor_[hash]',
    },
    plugins: [
        new CleanWebpackPlugin(['public'], {
            root: path.join(__dirname, '../'),
        }),
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_[hash]',
            path: path.join(__dirname, '../public/dll', 'manifest.json'),
        })
    ]
};
