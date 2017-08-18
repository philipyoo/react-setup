const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
Notes:
- ExtractTextPlugin: Moves all required *.css modules in entry chunks
    into a separate CSS file. So your styles are no longer inlined into
    the JS bundle, but in a separate CSS file (styles.css). If your total
    stylesheet volume is big, it will be faster because the CSS bundle is
    loaded in parallel to the JS bundle.
- nodeExternals: When bundling with Webpack for the backend, you usually
    don't want to bundle its node_modules dependencies. This library
    creates an externals function that ignores node_modules when bundling
    in Webpack.
- UglifyJsPlugin: Minimize all JS output of chunks. Loaders are switched
    into minimizing mode.
*/

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'static'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('styles.css')
    ]
}
