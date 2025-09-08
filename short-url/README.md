# Short URL Service

A minimal URL shortener built with Express and MongoDB (Mongoose). Create short IDs for long URLs via a simple API.

## Prerequisites
- Node.js 18+
- MongoDB running locally (default URI: `mongodb://localhost:27017/short-url`)

## Install
```bash
npm install
```

## Run
```bash
npm start
```
By default the server listens on port `8001`.

## Project Structure
- `index.js`: Express app bootstrap and route mounting
- `connect.js`: MongoDB connection helper using Mongoose
- `routes/url.js`: Route definitions for URL operations
- `controllers/url.js`: Request handlers (controllers)
- `models/url.js`: Mongoose schema/model for URLs

## API
### Create a short URL
- Method: `POST`
- Path: `/url`
- Body (JSON):
```json
{
  "url": "https://example.com/some/very/long/path"
}
```
- Response (JSON):
```json
{
  "id": "<shortId>"
}
```

The `id` is the generated short identifier. You can render the short link as `http://localhost:8001/url/<id>`.

### Resolve and redirect
- Method: `GET`
- Path: `/url/:shortId`
- Behavior: Increments visit history and redirects to the original URL.

Example: `GET http://localhost:8001/url/abc123` → 302 redirect to the stored `redirectUrl`.

### Get analytics
- Method: `GET`
- Path: `/url/analytics/:shortId`
- Response (JSON):
```json
{
  "totalClicks": 3,
  "analytics": [
    { "timestamp": 1736369990000 },
    { "timestamp": 1736373590000 }
  ]
}
```

## Data Model
`models/url.js` defines:
- `shortId` (string, unique)
- `redirectUrl` (string)
- `visitHistory` (array of `{ timestamp: number }`)
- Automatic `createdAt` / `updatedAt` timestamps

## Notes
- Input validation is minimal. Consider validating `url` format and enforcing allowed protocols.
- `shortid` is used for ID generation. For production, prefer collision-resistant IDs, e.g. `nanoid`.
- Add a GET route to resolve and redirect short URLs, e.g. `GET /u/:id` that looks up `shortId`, tracks a visit, and returns a redirect with `res.redirect(...)`.
- Configure the MongoDB connection via environment variables for different environments.
