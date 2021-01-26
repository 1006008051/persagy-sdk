'use strict';
const path = require('path');
module.exports = {
    entry: ['./src/main.ts'],
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'index.js',
        library: 'web-sdk',
        libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
        globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
        libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
    },
    mode: 'production',
    target: 'node',
    resolve: {
        // Tells Webpack what files to watch      
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
