const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname,
        "dist"),
    indexPath: 'html/shop/index.html',
    css: {
        extract: {
            filename: 'css/shop/[name].[hash:8].css',
            chunkFilename: 'css/shop/[name].[hash:8].css'
        }
    },
    js: {
        filename: 'js/shop/[name].[hash:8].js',
        chunkFilename: 'js/shop/[name].[hash:8].js'
    }
}