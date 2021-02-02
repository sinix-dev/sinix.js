/**
 * Loading "db" and "channel" modules
 * @type {Object}
 */
const db = require("./db")
const channel = require("./channel")

/**
 * Exporting "db" and "remote" modules
 * @type {Object}
 */
module.exports = {
  db,
  channel
}
