const path = require('path')
const Router = require('./lib/router')
const utils = require('./lib/utils')
const DataSet = require('./lib/dataset')
const mockjs = require('mockjs')

module.exports = function(config) {
  //handle config
  config.routeFile = path.resolve(config.basePath, config.routeFile)
  config.mockFolder = path.resolve(config.basePath, config.mockFolder)
  config.mockExts = ['.js', '.json']

  const router = new Router(config.routeFile)

  return function(req, res, next) {
    const route = req.path
    const match = router.search(route, req.method)

    req._search = {
      route: route,
      match: match
    }

    //if match file's extension not js or json , return next()
    if (!(match && match.file) || !utils.contains(config.mockExts, path.extname(match.file)))
      return next()
    const ds = new DataSet(
      config.mockFolder,
      config.mockExts
    )

    const data = ds.get(match.file, {
      params: match.params,
      query: req.query,
      body: req.body
    })

    //response delay
    const delay = 0
    if (data.$$delay >= 0) {
      delay = data.$$delay
      delete data['$$delay']
    }

    //response status
    const statusCode = '200'
    if (!!data.$$statusCode) {
      statusCode = data.$$statusCode
      delete data['$$statusCode']
    }

    //DEFAULT ALLOW CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    //set response header
    if (data.$$header) {
      Object.keys(data.$$header).forEach(function(key) {
        res.set(key, data.$$header[key]);
      });
      delete data['$$header'];
    }

    setTimeout(function() {
      res.status(statusCode).json(mockjs.mock(data))
    }, delay)

  }
}
