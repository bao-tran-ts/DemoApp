const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Proxy API requests to backend
app.use('/api', createProxyMiddleware({
  target: 'http://backend-service:80',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '' // Remove /api prefix when forwarding to backend
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Backend service unavailable' });
  }
}));

// Fallback to serve index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server listening on port ${PORT}`);
});
