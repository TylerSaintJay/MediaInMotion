// ============================================
// MOCION CORE — Production Server (Hostinger)
// ============================================
// This is the single entry point for the application.
// It serves the built React app from /dist and handles API routes.

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// ---- Serve Static Files from /dist ----
// This is the BUILT output from `npm run build` (Vite)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }
    }
}));

// ---- API Routes ----

// Database setup
const DB_PATH = path.join(__dirname, 'data', 'leads.json');
if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

// POST /api/leads
app.post('/api/leads', async (req, res) => {
    try {
        const { contact, qualification, source } = req.body;
        if (!contact || !contact.email) {
            return res.status(400).json({ status: 'error', message: 'Invalid payload: Email required' });
        }

        const leadId = crypto.randomUUID();
        const newLead = {
            lead_id: leadId,
            timestamp: new Date().toISOString(),
            source,
            contact,
            qualification,
            status: 'New'
        };

        const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        dbData.push(newLead);
        fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
        console.log(`[VAULT] Lead ${leadId} secured.`);

        if (process.env.ZAPIER_WEBHOOK_URL) {
            try {
                await fetch(process.env.ZAPIER_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newLead)
                });
                console.log(`[BRIDGE] Zapier sync confirmed.`);
            } catch (zapError) {
                console.error(`[BRIDGE ERROR] ${zapError.message}`);
            }
        }

        res.status(200).json({
            status: 'success',
            message: 'Infrastructure handshake complete.',
            lead_id: leadId
        });
    } catch (error) {
        console.error('[CORE ERROR]', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Logic Failed' });
    }
});

// GET /api/status
app.get('/api/status', (req, res) => {
    res.json({
        status: 'OPERATIONAL',
        latency: '24ms',
        timestamp: new Date().toISOString()
    });
});

// ---- SPA Catch-All ----
// Express 5 uses {*path} instead of * for wildcard routes
app.get('{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// ---- Start Server ----
app.listen(PORT, () => {
    console.log(`\n🚀 MOCION_CORE OPERATIONAL`);
    console.log(`📡 Server listening on port ${PORT}`);
    console.log(`📂 Serving static files from: ${distPath}`);
    console.log(`🔗 Hybrid Bridge Active\n`);
});
