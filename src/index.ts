import http from 'http';
import fs from 'fs';
// import path from 'path';

const server = http.createServer((req, res) => {
  let filePath = './public' + (req.url === '/' ? '/index' : req.url);
  filePath += '.html';
  fs.readFile(filePath, function (err, data) {
    if (err == null) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    } else {
      fs.readFile('./public/404.html', function (err, data) {
        if (err == null) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        }
      })
    }
  })
});

const PORT = 8080;
server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
