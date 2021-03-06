var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require("path");

const SRC = path.join(__dirname, 'lib');
const APP = path.join(__dirname, 'lib/example');


module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: path.join(SRC, 'example', 'src', 'index.jsx'),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: SRC,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    output: {
        path: APP,
        filename: '8-Bit-Mario.min.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};