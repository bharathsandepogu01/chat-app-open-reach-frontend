const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: {
		main: './src/index.ts',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build'),
		assetModuleFilename: 'images/[name]-[hash][ext]',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
								localIdentContext: path.resolve(__dirname, 'src'),
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [path.resolve(__dirname, 'src/styles')],
							},
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif|webp)$/i,
				type: 'asset/resource',
				exclude: /node_modules/,
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@public': path.resolve(__dirname, 'public/'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@src': path.resolve(__dirname, 'src/'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// favicon: './public/favicon.ico',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',	
		}),
		new Dotenv({
			systemvars: true,
		}),
	],
	optimization: {
		runtimeChunk: 'single',
	},
};
