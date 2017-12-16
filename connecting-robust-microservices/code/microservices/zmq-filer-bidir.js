const zmq = require('zeromq');
const cluster = require('cluster')
const numWorkers = require('os').cpus().length

let readyWorkers = 0;

if (cluster.isMaster) {
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`));
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. restarting...`);
    cluster.fork();
  });
  const pusher = zmq.socket('push');

  pusher.identity = 'upstream' + process.pid;
  pusher.bind('ipc://filer-sendJobs.ipc', err => {
    if (err) throw err;
    console.log('bound!');

    setInterval(() => {
      let date = new Date().toUTCString();
      console.log(pusher.identity + ': sending data ' + date);
      pusher.send(date);
    }, 500);
  });
} else {
  const puller = zmq.socket('pull');
  puller.identity = 'downstream' + process.pid;
  puller.connect('ipc://filer-sendJobs.ipc');
  console.log('connected');
  puller.on('message', data => {
    console.log(puller.identity + ': received data ' + data.toString());
  });
}
