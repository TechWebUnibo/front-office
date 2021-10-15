const path = require("path");


/* config-overrides.js */

module.exports = function override(config, env) {
    config.output.filename = 'js/shop/[name].[hash:8].js'
    config.output.chunkFilename = 'js/shop/[name].[hash:8].js'
    config.plugins[5].options.filename = 'css/shop/[name].[hash:8].css'
    config.plugins[5].options.chunkFilename = 'css/shop/[name].[hash:8].css'

    return config;
}