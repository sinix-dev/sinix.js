const all = () => {
  console.info("Get all users")
}

const disconnect = (username) => {
  console.info("Disconnect specific user")
}

const listen = (username, event, cb) => {
  console.info("Listen for specific event by specific user")
}

module.exports = {
  all,
  disconnect,
  listen
}
