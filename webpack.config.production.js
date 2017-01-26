var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/main.js'],
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				test: [/\.jsx$/, /\.js$/],
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-0'],
					plugins: ['transform-decorators-legacy']
				}
			}
		],
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				drop_console: true,
				compress: {
					warnings: true
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin()
		]
	}
};
