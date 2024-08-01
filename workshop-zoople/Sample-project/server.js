const express = require('express');
const fs = require('fs');
const mongoose=require('mongoose')

const app = express();
const port =  3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to serve static data
app.get('/api/data', (req, res) => {
  // Read static data from data.json
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Parse JSON data and send it as a response
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to parse data' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
