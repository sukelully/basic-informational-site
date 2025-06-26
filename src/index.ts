import http from 'http';
import { readFile } from 'fs/promises';

const PORT = 8080;
const server = http.createServer(async (req, res) => {
  try {
    const filePath = './public' + (req.url === '/' ? '/index' : req.url) + '.html';

    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    try {
      console.error(err);
      const notFound = await readFile('./public/404.html');
      res.writeHead(404, {'Content-Type': 'text/html' });
      res.end(notFound);
    } catch (err404) {
      console.error(err404);
      res.writeHead(500, { 'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
    }
  }
})

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
