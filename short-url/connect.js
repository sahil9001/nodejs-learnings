const mongoose = require('mongoose');

// Enable strict query mode to avoid accidental filtering on fields
// that are not in the schema (helps catch typos at runtime).
mongoose.set("strictQuery", true);

// Establish a connection to MongoDB using the provided connection URL.
// Returns a promise that resolves to the active connection.
async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

// Export the connection helper so the server can import and use it.
module.exports = {
    connectToMongoDB
}