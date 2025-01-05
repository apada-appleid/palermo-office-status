const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8886;
const statusFilePath = path.join(__dirname, 'status.txt');

app.use(express.static(__dirname));

app.get('/status', (req, res) => {
    fs.readFile(statusFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read status file' });
        }
        const inOffice = data.trim() === 'true';
        res.json({ inOffice });
    });
});

app.post('/toggle', (req, res) => {
    fs.readFile(statusFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read status file' });
        }
        const currentStatus = data.trim() === 'true';
        const newStatus = !currentStatus;
        fs.writeFile(statusFilePath, newStatus.toString(), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not write status file' });
            }
            res.json({ inOffice: newStatus });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
