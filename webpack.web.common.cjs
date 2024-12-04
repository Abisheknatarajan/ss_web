const path = require('path');

module.exports = {
    target: 'browserslist',
    output: {
        filename: 'app-web-[hash].js',
        clean: false,
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.cjs', '.ts', '.tsx'],
    },
    ignoreWarnings: [
        {
            module: /node_modules/,
        },
    ],
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset',
                parser: { dataUrlCondition: { maxSize: 15000 } },
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(json)$/i,
                type: 'json',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    performance: {
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000,
    },
};