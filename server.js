const http = require("http");

function renderPage(value) {
  const safeValue = String(value ?? "undefined")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>test_1</title>
<style>
  :root {
    color-scheme: light dark;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .card {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 16px;
    padding: 2.5rem 3rem;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
    text-align: center;
    max-width: 420px;
    width: 90%;
    animation: fadeIn 0.5s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .badge {
    display: inline-block;
    background: #eef2ff;
    color: #4338ca;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    margin-bottom: 1rem;
  }
  h1 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    color: #1f2937;
  }
  p.label {
    margin: 0 0 0.25rem;
    color: #6b7280;
    font-size: 0.85rem;
  }
  .value {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 1.15rem;
    background: #111827;
    color: #34d399;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    word-break: break-word;
    margin: 0.5rem 0 1.5rem;
  }
  .footer {
    font-size: 0.75rem;
    color: #9ca3af;
  }
</style>
</head>
<body>
  <div class="card">
    <span class="badge">test_1</span>
    <h1>&#128075; Hello from the server</h1>
    <p class="label">HELLO_WORLD environment variable</p>
    <div class="value">${safeValue}</div>
    <div class="footer">Served by a tiny Node.js HTTP server &middot; no dependencies</div>
  </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(renderPage(process.env.HELLO_WORLD));
});

server.listen(8080, () => console.log("listening on 8080"));
