const axios = require("axios")
const EVENT_OBJ = {}

const poll = (resolve) => {
  axios.post("http://localhost:41431/health")
    .then((res) => {

      resolve()
    })
    .catch((err) => {
      setTimeout(() => {
        poll(resolve)
      }, 1430)
    })
}

const register = () => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams()
    params.append("username", "sinix")

    axios.post("http://localhost:41431/register", params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const connect = () => {
  const socket = new WebSocket("ws://localhost:41431/ws/sinix")

  return socket
}

const setup = new Promise((resolve, reject) => {
  poll(async () => {
    await register()

    const socket = connect()

    socket.onmessage = (resp) => {
      let { data } = resp

      data = JSON.parse(data)

      if(EVENT_OBJ[data.event_type]){
        EVENT_OBJ[data.event_type](data.payload)
      }
    }

    resolve(socket)
  })
})

const listen = (evnt, cb) => {
  setup.then((socket) => {
    EVENT_OBJ[evnt] = cb
  })
}

module.exports = {
  listen,
}
