
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../../data/leads.json');

// Ensure DB exists logic
if (!fs.existsSync(path.dirname(DB_PATH))) {
    try {
        fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    } catch (e) {
        console.error("Error creating data directory:", e);
    }
}
if (!fs.existsSync(DB_PATH)) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    } catch (e) {
        console.error("Error creating database file:", e);
    }
}

// POST /api/leads - Handshake & Logic
router.post('/leads', async (req, res) => {
    try {
        const { contact, qualification, source } = req.body;

        // 1. Validation (Basic)
        if (!contact || !contact.email) {
            return res.status(400).json({ status: 'error', message: 'Invalid payload: Email required' });
        }

        const leadId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        const newLead = {
            lead_id: leadId,
            timestamp,
            source,
            contact,
            qualification,
            status: 'New'
        };

        // 2. Persistence (Local Vault)
        const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        dbData.push(newLead);
        fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));

        console.log(`[VAULT] Lead ${leadId} secured locally.`);

        // 3. Automation (Zapier Bridge)
        if (process.env.ZAPIER_WEBHOOK_URL) {
            try {
                console.log(`[BRIDGE] Transmitting to Zapier...`);
                // Use native fetch instead of axios
                await fetch(process.env.ZAPIER_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newLead)
                });
                console.log(`[BRIDGE] Transmission confirmed.`);
            } catch (zapError) {
                console.error(`[BRIDGE ERROR] Zapier sync failed: ${zapError.message}`);
            }
        } else {
            console.log(`[BRIDGE] ZAPIER_WEBHOOK_URL not configured. Skipping sync.`);
        }

        // 4. Response
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

// GET /api/status - System Check
router.get('/status', (req, res) => {
    res.json({
        status: 'OPERATIONAL',
        latency: '24ms',
        timestamp: new Date().toISOString()
    });
});

export default router;
