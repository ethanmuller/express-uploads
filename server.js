const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const ba64 = require('ba64')
const port = 3000;

app.use(cors())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Require the upload middleware
const upload = require('./upload');

app.get('/', (req, res) => {
  // Handle the uploaded file
  res.sendFile(__dirname + '/index.html')
});

// Set up a route for file uploads
app.post('/upload', (req, res) => {
  // Handle the uploaded file
  ba64.writeImageSync('uploads/' + Date.now(), req.body.base64image)
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
