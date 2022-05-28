const express = require('express');
const cors = require('cors');
const app = express()
app.use(cors());
const port = 3001

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ test: "Sample response" }));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})