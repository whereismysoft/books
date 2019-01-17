const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // webpack 4 takes '/src/index.js' by default
    // entry: path.join(__dirname, '/src/index.js'),

    // output file by default is './dist/main.js'
    output: {
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
                // query: { presets: ["@babel/preset-react"] }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                          modules: true,
                          localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
            }
        ]
    },
    devServer: {
        inline: false,
        // contentBase: path.join(__dirname, 'dist'),
        // filename: path.join(__dirname, '/dist/main.js'),
        publicPath: '/',
        // compress: true,
        port: 9000,
        historyApiFallback: true,
        watchContentBase: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html'),
            inject: 'body'
        })
    ]
 }