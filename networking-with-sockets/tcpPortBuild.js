'use strict'
const
  net = require('net'),
  server = net.createServer(connection => {
    // Use the connection object for data transfer.
    console.log('Yayyy Im here!!!')
  })
server.listen(60300)
console.log('Net-> ' + net)
console.log('Server-> ' + server)
