// Planova — basit yerel geliştirme sunucusu (yalnızca statik dosya sunar)
// Çalıştırma: node server.js  →  http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
// Varsayılan olarak yalnızca bu bilgisayardan erişilebilir.
// Telefondan aynı Wi-Fi üzerinden test etmek için: HOST=0.0.0.0 node server.js
const HOST = process.env.HOST || '127.0.0.1';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

// Dışarıya asla sunulmaması gereken klasör/dosyalar
const BLOCKED = /(^|[\\/])(\.git|\.vs|\.vscode|ASI\.Api|node_modules)([\\/]|$)|(^|[\\/])\.[^\\/]*$/i;

function send(res, status, text) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(text);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method Not Allowed');

  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    return send(res, 400, 'Bad Request'); // bozuk %-kodlama sunucuyu çökertmesin
  }
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  // Yolu çöz ve proje klasörünün dışına çıkılmadığını doğrula (path traversal koruması)
  const filePath = path.resolve(ROOT, '.' + path.posix.normalize('/' + urlPath));
  const rel = path.relative(ROOT, filePath);
  if (rel.startsWith('..') || path.isAbsolute(rel) || BLOCKED.test(rel)) {
    return send(res, 404, 'Not Found');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not Found');
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache'
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Planova çalışıyor: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
});
