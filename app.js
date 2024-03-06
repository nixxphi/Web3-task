const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your-secret-key'; // Change this to a secure secret key, that's Azi's job

// This for handling file uploads
app.use(fileUpload());

// Static files
app.use(express.static('public'));

// User authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }
        req.user = user;
        next();
    });
}

// Handling user file uploads
app.post('/upload', authenticateToken, async (req, res) => {
    if (!req.files || !req.files.fileInput) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.fileInput;
    
    try {
        // Store the file on IPFS (or any other decentralized storage)
        const ipfsHash = await storeOnIPFS(uploadedFile);
        
        // Send transaction to the smart contract to store the IPFS hash
        const accounts = await web3.eth.getAccounts();
        await contract.methods.storeIdentification(ipfsHash).send({ from: accounts[0] });

        res.send('File uploaded successfully and stored on the blockchain.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while uploading the file.');
    }
});

// Function to store file on IPFS (or any other decentralized storage)
async function storeOnIPFS(file) {
    // Implementation to store file on IPFS goes here
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
