/**
 * Created by Min on 2017/7/19.
 */
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WebpackChunkHash = require('webpack-chunk-hash'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    __DEV__ = (process.env.NODE_ENV || 'development') === 'development';

exports.commonPlugins = [new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(__DEV__
            ? 'development'
            : 'production'),
    },
})];

exports.devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        title: 'OTCWallet',
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        hash: true,
    }),
    new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: false,
        options: {
            eslint: {
                configFile: path.join(__dirname, '../tools/.eslintrc'),
            },
            context: '/',
        },
    }),
    new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, '../../public/dll', 'manifest.json'),
    }),
    new DashboardPlugin(),
];

exports.prodPlugins = [
    new CleanWebpackPlugin([
        'dist',
        'public',
        'release',
        'build',
    ], {
        root: path.join(__dirname, '../../'),
    }),
    new webpack
        .optimize
        .CommonsChunkPlugin({
            names: [
                'vendor',
                'manifest',
            ],
            filename: 'vendor.bundle.js',
            minChunks: ({ resource }) => resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.(js|less|scss)$/),
        }),
    new webpack
        .optimize
        .ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
        options: {
            context: '/',
        },
    }),
    new ExtractTextPlugin({ filename: '[name].style.[contenthash].css', disable: false, allChunks: true }),
    new UglifyJsPlugin(),
    new webpack
        .optimize
        .AggressiveMergingPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new HtmlWebpackPlugin({
        title: 'OTCWallet',
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
];
