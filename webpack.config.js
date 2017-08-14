var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {

    entry: APP_DIR + '/app.js',

    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: './public/'
    },

    devServer: {
        inline: true,
        contentBase: './public',
        port: 2244,
        historyApiFallback: true,
        stats: 'errors-only',
        headers: { "Access-Control-Allow-Origin": "*" }

    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                include: APP_DIR,
                query: {
                    presets: [
                        'es2015', 'stage-1', 'react'
                    ],
                    plugins: ['antd']
                }
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!sass-loader"
            }, {
                test: /\.less?$/,
                loaders: [
                    'style-loader', 'css-loader', 'less-loader?{"sourceMap":true}'
                ],
                include: __dirname
            }, {
                test: /\.(png|jpg|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            },
               {
                  test: /\.json$/,
                  loader: 'json',
                },
        ]
    },
    resolve: {
        alias: {
            app: APP_DIR
        }
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};

module.exports = config;
