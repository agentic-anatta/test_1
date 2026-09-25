const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`HELLO_WORLD=${process.env.HELLO_WORLD}`);
});

server.listen(8080, () => console.log("listening on 8080"));
