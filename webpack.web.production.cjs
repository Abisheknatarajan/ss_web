const { merge } = require('webpack-merge');
const common = require('./webpack.web.common');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin');
const outputPath = path.resolve(__dirname, 'dist/web');

module.exports = merge(common, {
    target: 'browserslist',
    ignoreWarnings: [
        {
            module: /node_modules/,
        },
    ],
    module: {
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/, /\.js$/, /\.cjs$/,/\.ttf$/],
                exclude: {
                    and: [
                        path.resolve(__dirname, '.git'),
                        path.resolve(__dirname, '.vscode'),
                        path.resolve(__dirname, '.yarn'),
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'dist'),
                    ],
                },
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: false,
                            presets: ['@babel/preset-env', ['@babel/preset-react', {
                                "runtime": "automatic"
                            }], '@babel/preset-typescript'],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env.production'),
        }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            exclude: 'node_modules',
            cache: false,
        }),
        new WorkBoxWebpackPlugin.GenerateSW({
            swDest: outputPath + '/service-worker.js',
            maximumFileSizeToCacheInBytes: 1024 * 1024 * 20,
        }),
    ],
});