const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: true //ENV === 'development'
});

module.exports = {
	context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    
    output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js'
    },

    resolve: {
		extensions: ['.jsx', '.js', '.scss'],
		modules: [
			//path.resolve(__dirname, 'src/lib'),
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
		alias: {
			//components: path.resolve(__dirname, 'src/components'),    // used for tests
			//style: path.resolve(__dirname, 'src/style'),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
    },
    
    module: {
		rules: [
			{
				test: /\.(jsx|js)?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.(jsx|js)?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			}
        ]
	},

	plugins: (
		[
			extractSass,
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
		]
	).concat(
		ENV==='production'
			?
				[
					new webpack.optimize.UglifyJsPlugin({
						output: {
							comments: false
						},
						compress: {
							unsafe_comps: true,
							properties: true,
							keep_fargs: false,
							pure_getters: true,
							collapse_vars: true,
							unsafe: true,
							warnings: false,
							screw_ie8: true,
							sequences: true,
							dead_code: true,
							drop_debugger: true,
							comparisons: true,
							conditionals: true,
							evaluate: true,
							booleans: true,
							loops: true,
							unused: true,
							hoist_funs: true,
							if_return: true,
							join_vars: true,
							cascade: true,
							drop_console: true
						}
					})
				]
			:
				[]
	),
	
	stats: { colors: true },
	
	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},
	
	devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',
};
