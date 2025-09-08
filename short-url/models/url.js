const mongoose = require('mongoose')

// Schema describing how short URLs are stored in MongoDB.
// - shortId: unique identifier for the short link
// - redirectUrl: original destination URL
// - visitHistory: array of visit timestamps to track usage
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number,
            }
        }
    ]
}, { timestamps: true });

// Create the Mongoose model bound to the 'url' collection.
const URL = mongoose.model('url', urlSchema);

module.exports = URL;