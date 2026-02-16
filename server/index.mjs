
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.mjs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set MIME types explicitly for Hostinger/VPS environments
express.static.mime.define({
    'application/javascript': ['js', 'mjs'],
    'text/css': ['css']
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static assets from the dist folder
app.use(express.static(path.join(__dirname, '../dist'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js') || path.endsWith('.mjs')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// API Routes
app.use('/api', apiRoutes);

// Catch-all route to serve the SPA (React) for any non-API request
// Important: Only serve index.html if the request doesn't look like an asset (has no file extension)
app.get('*', (req, res) => {
    // If request contains a dot (e.g. .js, .css, .png), it's a missing asset, don't serve HTML
    if (req.path.includes('.')) {
        res.status(404).end();
        return;
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(PORT, (err) => {
    if (err) {
        console.error('SERVER FAILED TO START:', err);
        return;
    }
    console.log(`\n🚀 MOCION_CORE OPERATIONAL`);
    console.log(`📡 Server listening on port ${PORT}`);
    console.log(`🔗 Hybrid Bridge Active\n`);
});
