/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Create the fallback path (the production .env)
const basePath = path.resolve(__dirname, './.env');

const envPath = `${basePath}.${process.env.NODE_ENV}`;

// Check if the file exists, otherwise fall back to the production .env
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config({ path: finalPath }).parsed;

const nodeEnv = process.env.NODE_ENV || 'development';

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
	const processEnv = prev;
	processEnv[`process.env.${next}`] = JSON.stringify(env[next]);
	return processEnv;
}, {});
console.log('envKeys', envKeys);

module.exports = {
	mode: nodeEnv,

	target: nodeEnv === 'development' ? 'web' : 'browserslist',

	entry: {
		index: path.resolve(__dirname, './src/js/index.js'),
		// vendors: ['react', 'react-dom', 'react-refresh/runtime'],
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].[chunkhash:6].js',
		clean: true,
	},

	// prevent HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
	// devtool: env === 'production' ? false : 'eval-source-map',
	devtool: env === 'production' ? false : 'inline-source-map',

	devServer: {
		static: [
			{
				directory: path.resolve(__dirname, 'dist'),
				publicPath: 'dist',
				serveIndex: true,
			},

			{
				directory: path.resolve(__dirname, 'assets'),
				// publicPath: 'assets',
			},
		],
		watchFiles: ['src/**/*.html'],
		// open: ['/?env=dev'],
		hot: true,
		// compress: true,
		historyApiFallback: true,
		https: {
			key: fs.readFileSync('/Users/orz99/zoo/cert/localhost-key.pem'),
			cert: fs.readFileSync('/Users/orz99/zoo/cert/localhost.pem'),
		},
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},

			{
				test: /\.css$/i,
				exclude: /(node_modules|bower_components)/,
				use: [
					env === 'development'
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
				],
			},

			{
				test: /\.s[ca]ss$/i,
				exclude: /(node_modules|bower_components)/,
				use: [
					env === 'development'
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
					{
						loader: 'sass-loader',
						// options: {
						//   sassOptions: {
						//     indentWidth: 2,
						//   }
						// },
					},
				],
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin(envKeys),
		// new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(nodeEnv) }),

		// new webpack.DefinePlugin({
		// 	// 'process.env.NODE_ENV': JSON.stringify(env),
		// 	// 'process.env.TARGET': JSON.stringify(target),
		// }),

		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:6].css',
		}),

		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.html',
			// favicon: './src/assets/favicon.ico',
			inject: 'body',
			// chunks: ['index', 'main'],
			// excludeChunks: env === 'production' ? ['ie', 'popular', 'scroll', 'user'] : ['ie', 'user'],
			minify:
				env === 'production'
					? {
							collapseWhitespace: true,
							removeComments: true,
							removeRedundantAttributes: false,
							removeScriptTypeAttributes: true,
							removeStyleLinkTypeAttributes: true,
							useShortDoctype: true,
					  }
					: false,
		}),

		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/assets/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),

		// prevent Promise undefined when use axios in IE11
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise', // works as expected
		}),

		new webpack.ProgressPlugin(),
	],

	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
	},

	optimization: {
		runtimeChunk: env === 'production' ? false : 'single', // Ensure there is only one instance to avoid multiple entry points for hot updates ChunkLoadError
		minimizer:
			env === 'production'
				? [
						new CssMinimizerPlugin({
							minimizerOptions: {
								preset: [
									'default',
									{
										discardComments: { removeAll: true },
									},
								],
							},
						}),
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true,
								},
								format: {
									// comments: /@license/i,
									comments: false,
								},
							},
							extractComments: true,
						}),
				  ]
				: [],
	},
};
