const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from React build directory in production
const buildPath = path.join(__dirname, 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// Store active response streams
const activeStreams = new Map();

app.post('/report-progress', (req, res) => {
    const { sessionId, status, message, track_index, total_tracks, zipPath } = req.body;
    const clientRes = activeStreams.get(sessionId);
    if (clientRes) {
        clientRes.write(`data: ${JSON.stringify({ status, message, track_index, total_tracks, zipPath })}\n\n`);
    }
    res.sendStatus(200);
});

app.post('/download-music', upload.single('csv'), (req, res) => {
    const csvPath = req.file.path;
    const sessionId = req.file.filename;
    const outputDir = path.join(__dirname, 'downloads', sessionId);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    activeStreams.set(sessionId, res);

    const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
    const scriptPath = path.join(__dirname, 'download.py');

    // Set progress report URL: localhost in dev, current host in production
    const progressReportUrl = process.env.PROGRESS_REPORT_URL || 'http://localhost:3001/report-progress';

    let command;
    let args;

    if (process.platform === 'win32') {
        command = 'cmd.exe';
        args = ['/c', 'start', '/wait', pythonCommand, scriptPath, csvPath, '--output', outputDir, '--session', sessionId];
    } else {
        // For non-windows, we just spawn normally as we can't easily open a new terminal window generically
        command = pythonCommand;
        args = [scriptPath, csvPath, '--output', outputDir, '--session', sessionId];
    }

    console.log(`Launching: ${command} ${args.join(' ')}`);
    const pythonProcess = spawn(command, args, {
        env: { ...process.env, PROGRESS_REPORT_URL: progressReportUrl }
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            const zipPath = `${outputDir}.zip`;
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 9 } });

            output.on('close', () => {
                const data = { status: 'archived', zipPath: path.basename(zipPath) };
                res.write(`data: ${JSON.stringify(data)}\n\n`);
                activeStreams.delete(sessionId);
                res.end();
            });

            archive.on('error', (err) => {
                res.write(`data: ${JSON.stringify({ status: 'error', message: err.message })}\n\n`);
                activeStreams.delete(sessionId);
                res.end();
            });

            archive.pipe(output);
            archive.directory(outputDir, false);
            archive.finalize();
        } else {
            res.write(`data: ${JSON.stringify({ status: 'error', message: `Process exited with code ${code}` })}\n\n`);
            activeStreams.delete(sessionId);
            res.end();
        }
    });

    req.on('close', () => {
        activeStreams.delete(sessionId);
        // We don't kill the detached window easily here, but it will finish or be closed by user
    });
});

app.get('/get-zip/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'downloads', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

// Serve React app for all other routes (SPA fallback)
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'build', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Not found');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
