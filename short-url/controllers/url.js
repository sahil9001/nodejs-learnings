const shortid = require('shortid')
const URL = require('../models/url');

// Controller: generate a new short URL record and return the short id.
// Expected body: { url: "https://example.com" }
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    // Basic input validation
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    // Generate a unique short id (e.g., "rkK1k2x").
    const shortId = shortid();

    // Persist mapping of shortId -> original URL.
    await URL.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    // Respond with the identifier so the client can construct the short link.
    return res.json({ id: shortId });
}

// Controller: resolve a shortId, record the visit, and redirect to the original URL.
// - Reads :shortId from route params
// - Appends a timestamp to visitHistory for basic analytics
// - Redirects the client to the stored redirectUrl
async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });

    res.redirect(entry.redirectUrl);
}

// Controller: return basic analytics for a given shortId.
// Response contains totalClicks and the raw visitHistory timestamps.
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}


module.exports = {
    handleGenerateNewShortURL,
    handleRedirectUrl,
    handleGetAnalytics
}