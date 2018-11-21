var HTMLWebpackPlugin=require('html-webpack-plugin');
var HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
    template:__dirname + '/app/index.html',
    filename:'index.html',
    inject:'body'
});
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
//hut
module.exports = {
    entry: __dirname + "/app/js/index.js",
    module: {
        loaders: [{
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader'
        }
        ,
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
          }
        ]
    },
    output:{
        filename:'transformed.js',
        
       path:__dirname + '/build'
    },
    plugins:[ new ExtractTextPlugin('styles.css'),HTMLWebpackPluginConfig]
};
//