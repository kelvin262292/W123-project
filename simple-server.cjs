const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  try {
    console.log(`Request: ${req.method} ${req.url}`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, 'dist', filePath);

    console.log(`Serving file: ${filePath}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Serve index.html for SPA routing
      filePath = path.join(__dirname, 'dist', 'index.html');
      console.log(`File not found, serving index.html: ${filePath}`);
    }

    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

const PORT = 5173;

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying to restart...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Graceful shutdown...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});