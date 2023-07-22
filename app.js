const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Parse form data using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Handle form submission and save data to a local file
// app.post('/submit', (req, res) => {
//   const formData = req.body;

//   // Convert the form data to a JSON string
//   const jsonData = JSON.stringify(formData, null, 2);

//   // Save the data to a local file
//   fs.writeFile('data.json', jsonData, (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//       res.status(500).send('Error saving data.');
//     } else {
//       console.log('Data saved to data.json');
//       res.sendFile(__dirname + '/public/completed.html');
//     }
//   });
// });

app.post('/submit', (req, res) => {
    const formData = req.body;
  
    // Read the existing data from the file (if the file exists)
    let existingData = [];
    if (fs.existsSync('data.json')) {
      const fileData = fs.readFileSync('data.json', 'utf8');
      existingData = JSON.parse(fileData);
    }
  
    // Update the existing data or add new data
    existingData.push(formData);
  
    // Save the updated data back to the file
    fs.writeFile('data.json', JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Error saving data.');
      } else {
        console.log('Data updated and saved to data.json');
        res.sendFile(__dirname + '/public/completed.html');
      }
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
