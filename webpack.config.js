const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

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
                test: /\.html$/,
                
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
        // loaders: [
        //     {
        //         exclude: /node_modules/,
        //         loader: 'babel-loader',
        //         query: {
        //             presets: ['es2015', 'react'],
        //         }
        //     }
        // ]
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
        })
    ]

}
