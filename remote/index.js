/* eslint-disable */
const axios = require("axios")

const all = () => {
  console.info("Get all users")
}

const disconnect = (username) => {
  console.info("Disconnect specific user")
}

const listen = (username, event, cb) => {
  console.info("Listen for specific event by specific user")
}

const poll = () => {
  axios.post("http://localhost:41431/health")
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      setTimeout(poll, 1430)
    })
}

module.exports = {
  all,
  poll,
  disconnect,
  listen
}
