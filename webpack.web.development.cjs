const { merge } = require('webpack-merge');
const common = require('./webpack.web.common');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    resolve: {
        fallback: {
            "querystring": require.resolve("querystring-es3")
        }
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.cjs$/],
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
                            presets: ['@babel/preset-env', '@babel/preset-typescript'],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                ],
            },
            {
                test: [/\.ts$/, /\.tsx$/],
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
                        loader: 'swc-loader',
                        options: {
                            sync: true,
                            jsc: {
                                parser: {
                                    syntax: 'typescript'
                                },
                                transform: {
                                    react: {
                                        runtime: 'automatic'
                                    }
                                }
                            },
                            sourceMaps: true,
                            inlineSourcesContent: true
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env.development'),
        }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            exclude: 'node_modules',
            cache: true,
        }),
        // TypeScriptで正しいエラーのラインナンバーを表示させる
        new ErrorOverlayPlugin(),
    ],
    watchOptions: {
        ignored: ['**/node_modules', '**/dist', '**/build', '**/src/api', '**/logs'],
        poll: 500,
    },
    devServer: {
        open: false,
        hot: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ["/api"],
                target: 'https://localhost:7099',
                secure: false, // Only set to false if you're using self-signed certificates in development
            },
        ],
    }
});