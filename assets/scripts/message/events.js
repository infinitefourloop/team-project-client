'use strict'

const io = require('socket.io-client')
const socket = io.connect('localhost:4741')
const api = require('./api')
const ui = require('./ui')

const onSend = function (event) {
  event.preventDefault() // prevents page reloading
  const msg = $('#m').val()
  socket.emit('chat message', msg)
  api.createMessage(msg)
    .then(ui.createMessageSucess)
    .catch(console.log)
}

const addHandlers = () => {
  $('html').on('submit', '#messageForm', onSend)
  socket.on('chat message', ui.postMessage)
}

module.exports = {
  addHandlers
}
