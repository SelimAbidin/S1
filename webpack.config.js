const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');


const devServer = {
    port: 9000,
    contentBase: join(__dirname, 'build')
}

module.exports = {
    entry: './src/index.ts',
    output: {
        path: join(__dirname, 'build'),
        filename: 'main.js'
    },
    devServer,
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Game Title Here',
            template: 'src/index.ejs'
        }),
        new CopyPlugin([
            { from: 'assets', to: 'assets' }
        ]),
    ]
}   