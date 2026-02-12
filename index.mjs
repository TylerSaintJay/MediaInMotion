
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

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist'))); // Serve static assets in production

// API Routes
app.use('/api', apiRoutes);

// Catch-all route to serve the SPA (React) for any non-API request
app.get('*', (req, res) => {
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
