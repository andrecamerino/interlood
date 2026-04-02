import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const PORT = 3001

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});