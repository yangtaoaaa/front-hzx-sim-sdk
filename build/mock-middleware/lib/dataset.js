const path = require('path')
const fs = require('fs')
const vm = require('vm')
const check = require('syntax-error')
const utils = require('./utils')

function DataSet(path, exts) {
  this.path = path
  this.exts = exts
}

DataSet.prototype.get = function(file, params) {
  const data = {}
  const dataExt = null

  const ext = path.extname(file)
  const regexp = new RegExp('\\' + ext + '$')

  let dataFile = file.replace(regexp, '')
  dataFile = path.resolve(this.path, dataFile)
  this.exts.some(function(ext) {
    if (fs.existsSync(dataFile + ext)) {
      dataExt = ext
      return true
    }
  })

  if (dataExt) {
    dataFile += dataExt
    const content = fs.readFileSync(dataFile).toString()
    if (content.indexOf('module.exports') >= 0) {
      const err = check(content, dataFile)
      if (err) return err
      data = jsHandler(content, params)
    } else {
      data = JSON.parse(content)
    }
  }

  return data
}

function jsHandler(content, params) {
  const sandbox = { module: {}, exports: {} }

  vm.createContext(sandbox)
  vm.runInContext(content, sandbox)

  const data = sandbox.module.exports
  if (utils.isFunc(data))
    data = eval('(' + data + ')')(params, utils)
  else
    data = utils.assign({}, data)

  return data
}

module.exports = DataSet
