const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');

const app = express();
const secretKey = 'secret-key'; // Change this to a secure secret key. I'm counting on you Azi.

// Here's our base user class with singleton pattern
class User {
    constructor(name) {
        if (User.exists) {
            return User.instance;
        }
        this.name = name;
        this.personalInformation = {};
        this.bankingData = {};
        this.educationData = {};
        this.moreData = {}; // ADDITIONAL DATA SECTION FOR USER-DEFINED CATEGORIES
        User.instance = this;
        User.exists = true;
    }

    // Methods for managing personal information
    addPersonalInformation(info) {
        this.personalInformation = info;
    }

    getPersonalInformation() {
        return this.personalInformation;
    }

    // Methods for managing banking data
    addBankingData(data) {
        this.bankingData = data;
    }

    getBankingData() {
        return this.bankingData;
    }

    // Methods for managing education data
    addEducationData(data) {
        this.educationData = data;
    }

    getEducationData() {
        return this.educationData;
    }

    // Method for adding data to the moreData section. The user is expected to create new categories for their data if it doesn't fit into the pre-existing models.
    addMoreData(category, data, subtopic = 'default') {
        if (!this.moreData[category]) {
            this.moreData[category] = {};
        }
        if (!this.moreData[category][subtopic]) {
            this.moreData[category][subtopic] = [];
            // LET'S MAKE SURE USER-CREATED CATEGORIES CAN HAVE GET METHODS
            this[`get${category.replace(/\s+/g, '')}Data`] = () => {
                return this.moreData[category][subtopic];
            };
        }
        this.moreData[category][subtopic].push(data);
    }
}


// Express middleware for file uploads. just so it's clear, I haven't mastered Express. I got this off stack overflow.
app.use(fileUpload());

// Serve static files
app.use(express.static('public'));

// Middleware for user authentication
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

// Handle file uploads
app.post('/upload', authenticateToken, async (req, res) => {
    if (!req.files || !req.files.fileInput) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.fileInput;
    
    try {
        // Store the file on IPFS (Thats the only decentralized storage I know of)
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
    res.status(500).send('Something went wrong... and that means you ain\'t getting to this data.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

