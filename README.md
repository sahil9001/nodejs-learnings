# Basics 

1. Node JS is open-source JavaScript runtime
2. Runs on V8 engine same as Google Chrome
3. Mostly used for developing server-side & networking apis/apps
4. Takes JS out of browser
5. Fast, scalable and popular in many areas.

6.3 M companies uses nodejs

## How Node.js Works?

Node.js operates on a **single-threaded, event-driven, non-blocking I/O model**. This means it can handle thousands of concurrent connections efficiently without creating multiple threads.

### Key Components:

1. **V8 JavaScript Engine**: Executes JavaScript code
2. **libuv**: C++ library that handles asynchronous I/O operations
3. **Event Loop**: The heart of Node.js that manages all operations
4. **Thread Pool**: Handles file system operations and other blocking tasks

## The Event Loop

The Event Loop is what makes Node.js non-blocking and asynchronous. It continuously monitors the call stack and callback queue, executing operations in a specific order.

### Event Loop Phases:

1. **Timer Phase**: Executes `setTimeout()` and `setInterval()` callbacks
2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, Prepare**: Internal use only
4. **Poll Phase**: 
   - Fetches new I/O events
   - Executes I/O related callbacks
   - If no callbacks, waits for new events
5. **Check Phase**: Executes `setImmediate()` callbacks
6. **Close Callbacks**: Executes close event callbacks (e.g., `socket.on('close', ...)`)

### Event Loop Flow:
```
┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

## Blocking vs Non-Blocking Operations

### Blocking Operations:
- **Synchronous I/O**: Operations that halt execution until completion
- **CPU-intensive tasks**: Heavy computations that block the main thread
- **Example**: `fs.readFileSync()`, `JSON.parse()` on large objects

```javascript
// Blocking - stops everything until file is read
const data = fs.readFileSync('large-file.txt');
console.log('This waits for file read to complete');
```

### Non-Blocking Operations:
- **Asynchronous I/O**: Operations that don't halt execution
- **Event-driven**: Uses callbacks, promises, or async/await
- **Example**: `fs.readFile()`, `setTimeout()`, database queries

```javascript
// Non-blocking - continues execution immediately
fs.readFile('large-file.txt', (err, data) => {
    console.log('This runs when file read completes');
});
console.log('This runs immediately, not waiting for file read');
```

## Why This Matters:

1. **Scalability**: Single thread can handle thousands of concurrent connections
2. **Efficiency**: No thread creation/destruction overhead
3. **Resource Usage**: Lower memory footprint compared to multi-threaded servers
4. **Simplicity**: No complex thread synchronization issues

## Best Practices:

- **Avoid blocking operations** in the main thread
- **Use async/await** or promises for I/O operations
- **Offload CPU-intensive tasks** to worker threads or child processes
- **Understand the event loop** to write efficient Node.js applications
