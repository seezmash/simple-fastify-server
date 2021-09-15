'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (app, opts) {
  // Place your custom code here

  // Do not touch the following lines
  app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
