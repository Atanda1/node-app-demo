const fs = require('fs')
const emitter = require('events')
const Logger = require('./logger');
const logger = new Logger();
const http = require('http');
// Register a listener
logger.on('message Logged', (arg) => {
    console.log('Listener called', arg);  
})
// const files = fs.readdirSync('./')
// console.log(files)

// fs.readdir('./', (err, files) => {
//   if (err) console.log('Error', err)
//   else console.log('Result', files)
// })

logger.log('message')

// // Raise an event
// emitter.emit('message Logged', { id: 1, url: 'http://' })
// emitter.emit('message Logged', { id: 2, url: 'http://', data: 'data' })

const log = require('./logger')
const server = http.createServer(
    (req, res) => {
        if (req.url === '/'){
            res.write('Hello World')
            res.end()
        }
        if (req.url === '/api/courses'){
            res.write(JSON.stringify([1, 2, 3]))
            res.end()
        }
    }
);


// server.on('connection', (socket) => {
//     console.log('New connection...')
// })

server.listen(3000)

console.log('Listening on port 3000...')