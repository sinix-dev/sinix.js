/**
 * Loading "db" and "remote" modules
 * @type {Object}
 */
const db = require("./db")
const remote = require("./remote")

/**
 * Exporting "db" and "remote" modules
 * @type {Object}
 */
module.exports = {
  db,
  remote
}
