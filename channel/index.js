/**
 * Loading 'axios' module
 */
const axios = require("axios")
/**
 * Store User events
 * @type {Object}
 */
const EVENT_OBJ = {}

/**
 * @param {*} resolve - resolving the value of Promise Object
 * @returns {void}
 */
const poll = (resolve) => {
  /**
   * Making async POST request to check server status
   */
  axios.post("http://localhost:41431/health")

    .then(() => {
    /**
    * Resolving value of Promise object returned after making POST request
    */
      resolve()
    })
    /**
     * Scheduling the 'poll' function to make the POST request if Promise is rejected
     */
    .catch(() => {
      setTimeout(() => {
        poll(resolve)
      }, 1430)
    })
}
/**
 * Register user for Beta version of Sinix
 * @returns {Object} Promise Object for user registration
 */
const register = () => {
  return new Promise((resolve, reject) => {

    const params = new URLSearchParams()
    /**
     * Add 'username' and 'sinix' to create a unique url for a user
     */
    params.append("username", "sinix")

    axios.post("http://localhost:41431/register", params)
    /**
     * Resolve the response received after making a POST request else reject.
     */
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * Creating a web socket connection for connecting to server for sinix
 * @returns {Object} - 'socket' object to send and receive data/responses
 */
const connect = () => {
  const socket = new WebSocket("ws://localhost:41431/ws/sinix")

  return socket
}

const setup = new Promise((resolve) => {
  poll(async() => {
    /**
     * Wait for user registration
     */
    await register()
    /**
     * Create a web socket connection
     */
    const socket = connect()
    /**
     * Listen to response from server
     * @param {*} resp
     */
    socket.onmessage = (resp) => {
      let { data } = resp
      /**
       * Parse data from 'resp' into JSON format.
       */
      data = JSON.parse(data)

      if(EVENT_OBJ[data.event_type]){
        EVENT_OBJ[data.event_type](data.payload)
      }
    }

    resolve(socket)
  })
})

/**
 * Listen to user events on Joystick
 * @param {*} evnt -events happening on server
 * @param {*} cb
 */
const listen = (evnt, cb) => {
  setup.then(() => {
    EVENT_OBJ[evnt] = cb
  })
}
/**
 * Exporting the 'listen' function
 */
module.exports = {
  listen,
}
