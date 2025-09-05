
// Built in package to build http server
const http = require('http');
const fs = require('fs');

// Builds a server
// Runs the callback function with request and using the res variable I can send the response
const myServer = http.createServer((req, res) => {
    console.log("New req received");
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.url} New req received\n`;
    // Non blocking operation
    fs.appendFile('log.txt', log, (err, data) => {
        res.end("Hello from server again");
    })
    res.end("Hello from Server");
});

// Listen on a port : A door on which server runs, runs the callback to call server started
myServer.listen(8000, () => console.log("Server started"));