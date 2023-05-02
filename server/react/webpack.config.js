const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
    mode: 'development',
    entry: './server/index.js',
    output: {
        filename : 'index.js',
        path: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            {
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
    ]
    },

    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
    },

    devServer: {
        static:{
            directory: path.join(__dirname, '/public')
        }
    }
    
}

const clientConfig = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename : 'bundle.js',
        path: path.join(__dirname, 'public')
    },

    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
    ]
    },

    devServer: {
        static:{
            directory: path.join(__dirname, '/public')
        }
    }
}

module.exports =[serverConfig, clientConfig]