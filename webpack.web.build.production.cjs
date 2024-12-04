const { merge } = require('webpack-merge');
const production = require('./webpack.web.production');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(production, {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist/web'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public/*.json",
                    to: "./[name][ext]",
                },
                {
                    from: "public/*.txt",
                    to: "./[name][ext]",
                },
                {
                    from: "public/*.ico",
                    to: "./[name][ext]",
                },
                // {
                //     from: "src/web/public/*.svg",
                //     to: "./[name][ext]",
                // },
                {
                    from: "public/*.png",
                    to: "./[name][ext]",
                },
                {
                    from: "public/*.config",
                    to: "./[name][ext]",
                },
                {
                    from: "public/fonts",
                    to: "./fonts",
                },
            ],
        }),
    ],
});