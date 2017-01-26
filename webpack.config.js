var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: "inline-sourcemap",
	entry: ['babel-polyfill', './src/main.js'],
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'app.bundle.js',
		publicPath: 'lib'
	},
	module: {
		loaders: [
			{
				test: [/\.jsx$/, /\.js$/],
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['transform-decorators-legacy']
				}
			}
		]
	}
};
