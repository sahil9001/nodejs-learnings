const express = require("express");
const {
    connectToMongoDB
} = require('./connect');
const urlRoute = require('./routes/url');
const app = express()

const PORT = 8001;

// Initialize MongoDB connection before setting up routes.
// Using a local MongoDB instance with database name `short-url`.
connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("MongoDB connected"));

app.use(express.json());
// Mount URL routes at /url. For example: POST /url to create a short URL
app.use('/url', urlRoute);

// Start the Express server.
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));