'use strict';
const server = require('net').createServer(connection => {
  console.log('Subscriber connected.');
  const firstChunck = '{"type":"changed", "timesta';
  const secondChunck = 'mp":1450694370094}\n';
  connection.write(firstChunck);
  const timer = setTimeout(() => {
    connection.write(secondChunck);
    connection.end();
  }, 8000);
  connection.on('end', () => {
    clearTimeout(timer);
    console.log('Subscriber disconnected.');
  })
})
server.listen(60300, () => console.log('Test server listening for subscribers...'));
