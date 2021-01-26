'use strict';
const path = require('path');
module.exports = {
    entry: ['./src/main.ts'],
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'index.js',
        library: 'persagy-sdk',
        libraryExport: "default",
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    mode: 'production',
    target: 'node',
    resolve: {  
        extensions: ['.ts', '.js'],
        modules: ['node_modules', 'src', 'package.json'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
        ],
    }
};
