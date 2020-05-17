const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: isDevelopment && 'source-map',
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, '../src')
    },
    module: {
        rules: [
            { test: /\.(jpg|png|gif)$/,
               use: [
               {
               loader: 'file-loader',
                options: {
                           name: '[name].[ext]',
                           outputPath: 'static/',
                           useRelativePath: true,
                       }
                   },
                   {
                       loader: 'image-webpack-loader',
                       options: {
                        mozjpeg: {
                               progressive: true,
                               quality: 65
                           },
                           options: {
                               enable: true
                           },
                           pngquant: {
                               quality: '65-90',
                               speed: 4
                           },
                           gifsicle: {
                               quality: '65-90',
                               speed: 4
                           },
                           webp: {
                               quality: 75
                           }
                       }
                   }
                ]
               },
            { test: /\.handlebars$/, loader: 'handlebars-loader'},
            { test: /\.(scss|css)$/,
               use: [
                   MiniCssExtractPlugin.loader,
                   {
                       loader: 'css-loader',
                       options: {
                           sourceMap: isDevelopment,
                           
                       }
                   },
                   {
                       loader: 'postcss-loader',
                       options: {
                           autoprefixer: {
                               browsers: ['last 2 versions']
                           },
                           plugins: () => [
                               autoprefixer
                           ]
                       },
                   },
                   {
                       loader: 'sass-loader',
                       options: {
                           sourceMap: isDevelopment
                       }
                   }
               ]}
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-styles.css',
            chunkFilename: '[id].css'

        }),
        new HtmlWebpackPlugin({
            title: 'My awesome service',
            template: './src/index.handlebars',
            minify: true && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            },
        })
    ]
};