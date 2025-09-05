
/**
 * Simple HTTP Server using Node.js Built-in Modules
 * This server demonstrates basic HTTP server creation, request handling, and file operations
 */

// Import built-in Node.js modules
const http = require('http'); // Core HTTP module for creating web servers
const fs = require('fs');     // File system module for file operations

/**
 * Create HTTP Server
 * http.createServer() creates a new HTTP server instance
 * The callback function is executed for every incoming request
 * 
 * @param {http.IncomingMessage} req - Request object containing client data
 * @param {http.ServerResponse} res - Response object for sending data back to client
 */
const myServer = http.createServer((req, res) => {
    // Log every incoming request to console
    console.log("New req received");
    
    // Optional: Log request headers (commented out to reduce noise)
    // console.log(req.headers);
    
    // Create a log entry with timestamp and request URL
    // Date.now() returns current timestamp in milliseconds
    // req.url contains the path portion of the request URL
    const log = `${Date.now()}: ${req.url} New req received\n`;
    
    /**
     * File System Operation - Non-blocking I/O
     * fs.appendFile() asynchronously appends data to a file
     * This is a NON-BLOCKING operation - the server continues processing other requests
     * while this file operation happens in the background
     * 
     * @param {string} 'log.txt' - File path to append data to
     * @param {string} log - Data to append to the file
     * @param {function} callback - Function called when operation completes
     */
    fs.appendFile('log.txt', log, (err, data) => {
        // This callback runs when the file write operation completes
        // If there's an error, err will contain the error details
        // If successful, data will be undefined (appendFile doesn't return data)
        
        if (err) {
            console.error('Error writing to log file:', err);
            // Send error response to client
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Send success response to client
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Hello from server again");
        }
    });
    
    // IMPORTANT: This line causes an issue!
    // res.end() is called immediately, before the file operation completes
    // This means the response is sent before the file write finishes
    // The file operation callback above will try to send another response
    // This will cause an error: "Cannot set headers after they are sent"
    // 
    // SOLUTION: Remove this line and only send response in the callback
    // res.end("Hello from Server");
});

/**
 * Start the Server
 * myServer.listen() starts the server and makes it listen for connections
 * 
 * @param {number} 8000 - Port number to listen on
 * @param {function} callback - Function called when server starts successfully
 */
myServer.listen(8000, () => {
    console.log("Server started on http://localhost:8000");
    console.log("Press Ctrl+C to stop the server");
});

/**
 * Event Handlers for Server Lifecycle
 */

// Handle server errors
myServer.on('error', (err) => {
    console.error('Server error:', err);
});

// Handle when server closes
myServer.on('close', () => {
    console.log('Server has been closed');
});

/**
 * Graceful Shutdown
 * Handle process termination signals to close server properly
 */
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT. Shutting down gracefully...');
    myServer.close(() => {
        console.log('Server closed successfully');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\nReceived SIGTERM. Shutting down gracefully...');
    myServer.close(() => {
        console.log('Server closed successfully');
        process.exit(0);
    });
});