/**
 * Created by Min on 2017/7/19.
 */
module.exports = {
    resolve: {
        extensions: ['.jsx', '.js', '.sass', '.scss'],
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
    },
    externals: [
        ((context, request, callback) =>
            (context, request, callback) =>
                ['electron'].indexOf(request) >= 0 ? callback(null, "require('" + request + "')") : callback())()
    ]
};
