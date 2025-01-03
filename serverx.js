const express = require('express');
const fs = require('fs');
const app = express();
const port = 6000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Root route to verify server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// GET endpoint to save form data
app.get('/save-data', (req, res) => {
    const formData = req.query;

    console.log('Received form data:', formData);

    if (Object.keys(formData).length === 0) {
        return res.status(400).send({ message: 'No query parameters provided.', success: false });
    }

    fs.writeFile('form-data.json', JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send({ message: 'Error saving data.', success: false });
        }
        console.log('Order placed successfully!');
        res.send({ message: 'Order placed successfully!', success: true, data: formData });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
