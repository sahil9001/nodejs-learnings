const express = require('express')
const { handleGenerateNewShortURL, handleRedirectUrl, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

// POST /url
// Body: { url: "https://example.com" }
// Response: { id: "<shortId>" }
router.post('/', handleGenerateNewShortURL);

router.get('/:shortId', handleRedirectUrl);

router.get('/analytics/:shortId', handleGetAnalytics);