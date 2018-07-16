const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const px2rem = require('postcss-px2rem')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),
    px2rem({remUnit: 50})
  ]
}
