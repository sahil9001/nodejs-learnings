# Basics 

1. Node JS is open-source JavaScript runtime
2. Runs on V8 engine same as Google Chrome
3. Mostly used for developing server-side & networking apis/apps
4. Takes JS out of browser
5. Fast, scalable and popular in many areas.

6.3 M companies uses nodejs

## How Node.js Works?

Node.js follows a **single-threaded, event-driven, non-blocking I/O model**. Here's how it works:

### Architecture Overview
1. **V8 JavaScript Engine**: Executes JavaScript code
2. **libuv**: C++ library that handles asynchronous I/O operations
3. **Node.js Bindings**: Connect JavaScript and C++ code
4. **Event Loop**: Core mechanism that handles callbacks and events

### Key Components:
- **Single Thread**: Main thread handles JavaScript execution
- **Thread Pool**: libuv manages a pool of threads for I/O operations
- **Event Queue**: Stores callbacks waiting to be executed
- **Event Loop**: Continuously checks for events and executes callbacks

## Node.js Event Loop

The Event Loop is the heart of Node.js that enables non-blocking I/O operations. It's a single-threaded loop that continuously processes events and callbacks.

### Event Loop Phases (in order):

1. **Timer Phase**
   - Executes `setTimeout()` and `setInterval()` callbacks
   - Only processes timers that have expired

2. **Pending Callbacks Phase**
   - Executes I/O callbacks deferred to the next loop iteration
   - Handles some system operations

3. **Idle, Prepare Phase**
   - Internal use only
   - Prepares for the next phase

4. **Poll Phase**
   - Fetches new I/O events
   - Executes I/O-related callbacks
   - If no callbacks, waits for new events

5. **Check Phase**
   - Executes `setImmediate()` callbacks

6. **Close Callbacks Phase**
   - Executes close event callbacks (e.g., `socket.on('close', ...)`)

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

### Key Concepts:

**Non-blocking I/O**: When an I/O operation is initiated, Node.js doesn't wait for it to complete. Instead, it continues executing other code and handles the result when the operation finishes.

**Callbacks**: Functions that are called when an asynchronous operation completes.

**Promises/Async-Await**: Modern alternatives to callbacks for handling asynchronous operations.

### Example:
```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timer callback');
}, 0);

setImmediate(() => {
    console.log('Immediate callback');
});

process.nextTick(() => {
    console.log('Next tick callback');
});

console.log('End');

// Output:
// Start
// End
// Next tick callback
// Timer callback
// Immediate callback
```

### Why Event Loop Matters:
- **Scalability**: Handles thousands of concurrent connections efficiently
- **Performance**: Non-blocking I/O prevents thread blocking
- **Resource Efficiency**: Single thread reduces memory overhead
- **Responsiveness**: Quick handling of I/O operations
