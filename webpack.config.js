const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env, { mode }) {
	const production = mode === 'production';
	return {
		mode: production ? 'production' : 'development',
		devtool: production ? 'source-map' : 'inline-source-map',
		entry: {
			app: ['./src/StoriBook.ts']
		},
		output: {
			filename: 'bundle.js',
			publicPath: '/'
		},
		resolve: {
			extensions: ['.ts', '.js'],
			modules: ['src', 'node_modules']
		},
		devServer: {
			port: 1234,
			historyApiFallback: true,
			open: !process.env.CI,
			devMiddleware: {
				writeToDisk: true,
			},
			static: {
				directory: path.join(__dirname, './')
			}
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin()
		],
		module: {
			rules: [
				{
					test: /\.ts$/i,
					use: [
						{
							loader: 'ts-loader'
						}
					],
					exclude: /node_modules/
				},
				{
					test: /\.svg/,
					type: 'asset/resource'
				},
				{
					test: /\.(css)$/,
					use: ['to-string-loader', 'css-loader'],
				}
			]
		}
	}
}