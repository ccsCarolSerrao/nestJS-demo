const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'production',
    optimization: {
        minimize: false,
        nodeEnv: false,
    },
    entry: {
        'example-api': './src/example-api/v1/handler.ts',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name]/index.js',
    },
    target: 'node',
    node: {
        __dirname: 'mock', // __dirname = '/' no bundle. Valor default.
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ],
    },
    plugins: [
        new webpack.IgnorePlugin({
            checkResource(resource) {
                const lazyImports = ['@nestjs/microservices', '@nestjs/microservices/microservices-module', '@nestjs/websockets/socket-module', 'cache-manager']
                if (!lazyImports.includes(resource)) {
                    return false
                }
                try {
                    require.resolve(resource)
                } catch (err) {
                    return true
                }
                return false
            },
        }),
    ],
    externals: {
        newrelic: true,
    },
}
