var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {

    entry: [
    'webpack-hot-middleware/client',
    APP_DIR + '/app.js'
     ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: './public/'
    },
		plugins: [
		 new webpack.HotModuleReplacementPlugin(),
		 new webpack.NoErrorsPlugin()
	 ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                include: APP_DIR,
                query: {
					presets: ['es2015', 'react', 'stage-0'],
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
