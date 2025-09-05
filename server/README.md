# Node.js HTTP Server

A simple HTTP server built using Node.js built-in modules to demonstrate basic server creation, request handling, and file operations.

## Overview

This project showcases:
- Creating an HTTP server using Node.js built-in `http` module
- Handling incoming requests and sending responses
- Asynchronous file operations using the `fs` module
- Request logging to a file
- Error handling and graceful shutdown

## Features

- **HTTP Server**: Basic web server listening on port 8000
- **Request Logging**: Logs all incoming requests with timestamps to `log.txt`
- **Non-blocking I/O**: Uses asynchronous file operations
- **Error Handling**: Proper error handling for file operations
- **Graceful Shutdown**: Handles SIGINT and SIGTERM signals

## Project Structure

```
server/
├── index.js          # Main server file
├── package.json      # Project configuration
├── log.txt          # Request log file (auto-generated)
└── README.md        # This file
```

## Installation & Setup

1. **Prerequisites**: Make sure you have Node.js installed (version 12 or higher)

2. **Navigate to the server directory**:
   ```bash
   cd server
   ```

3. **Install dependencies** (none required for this basic example):
   ```bash
   npm install
   ```

## Running the Server

### Start the server:
```bash
npm start
```
or
```bash
node index.js
```

### Access the server:
Open your browser and visit: `http://localhost:8000`

You can also test different routes:
- `http://localhost:8000/`
- `http://localhost:8000/about`
- `http://localhost:8000/contact`

## How It Works

### 1. Server Creation
```javascript
const http = require('http');
const myServer = http.createServer((req, res) => {
    // Handle requests here
});
```

### 2. Request Handling
- Every incoming request triggers the callback function
- Request object (`req`) contains client data (URL, headers, etc.)
- Response object (`res`) is used to send data back to the client

### 3. File Logging
- Each request is logged to `log.txt` with a timestamp
- Uses `fs.appendFile()` for non-blocking file operations
- Log format: `timestamp: URL New req received`

### 4. Response Sending
- Server sends a response after the file operation completes
- Includes proper HTTP status codes and headers

## Code Explanation

### Key Concepts Demonstrated:

1. **Event-Driven Architecture**: Server responds to incoming HTTP requests
2. **Asynchronous Operations**: File writing doesn't block the server
3. **Callback Functions**: Handle asynchronous operations completion
4. **Error Handling**: Proper error management for file operations
5. **Process Management**: Graceful server shutdown

### Important Notes:

⚠️ **Current Issue**: The original code has a bug where `res.end()` is called twice, which will cause an error. The commented code shows the fix.

## Testing the Server

### Using Browser:
1. Start the server
2. Open browser and visit `http://localhost:8000`
3. Try different URLs like `/about`, `/contact`
4. Check the `log.txt` file to see logged requests

### Using curl:
```bash
curl http://localhost:8000
curl http://localhost:8000/about
curl http://localhost:8000/test
```

### Using Postman:
- Create GET requests to `http://localhost:8000`
- Try different endpoints

## Log File

The server creates a `log.txt` file that contains:
```
1757099320837: / New req received
1757099320869: /about New req received
1757099522300: /contact New req received
```

Each line shows:
- **Timestamp**: When the request was received
- **URL**: The requested path
- **Message**: "New req received"

## Stopping the Server

- Press `Ctrl+C` in the terminal
- The server will shut down gracefully
- Any pending operations will complete before exit

## Common Issues & Solutions

### 1. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::8000
```
**Solution**: Change the port number in `index.js` or kill the process using port 8000

### 2. Permission Denied for log.txt
**Solution**: Ensure the server directory has write permissions

### 3. "Cannot set headers after they are sent"
**Solution**: Remove the duplicate `res.end()` call (see comments in code)

## Next Steps

This basic server can be extended with:
- **Routing**: Handle different URLs with different responses
- **Static File Serving**: Serve HTML, CSS, JS files
- **API Endpoints**: Create REST API endpoints
- **Middleware**: Add request processing middleware
- **Database Integration**: Connect to databases
- **Authentication**: Add user authentication
- **Express.js**: Use Express framework for easier development

## Learning Objectives

After studying this code, you should understand:
- How to create a basic HTTP server in Node.js
- The difference between blocking and non-blocking operations
- How to handle asynchronous file operations
- Basic error handling in Node.js
- How the event loop works with I/O operations
- Request/Response cycle in web servers

## Resources

- [Node.js HTTP Module Documentation](https://nodejs.org/api/http.html)
- [Node.js File System Module](https://nodejs.org/api/fs.html)
- [Understanding the Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
