const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');

const app = express();
const secretKey = 'secret-key'; // CHANGE THIS TO A SECURE SECRET KEY. I'M COUNTING ON YOU AZI.

// Initialize web3 for interacting with Ethereum network
const web3 = new Web3('http://localhost:8545'); // Update with your Ethereum node URL

// Deployed smart contract address
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = []; // Update with your contract ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Base user class with singleton pattern
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
        this.loginData = {}; // LOGIN DATA SECTION FOR STORING LOGIN CREDENTIALS SECURELY
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

    // Method for storing login data securely
    storeLoginData(service, username, password) {
        // WE'RE SUPPOSED TO STORE THE LOGIN DATA SECURELY USING ENCRYPTION BEFORE STORING IN BLOCKCHAIN
        // Here, we'll just store it in plain text for demonstration purposes, I'm not good enough to do the real thing yet 
        this.loginData[service] = { username, password };
    }

    // Method for retrieving login data securely
    getLoginData(service) {
        // RETRIEVE THE LOGIN DATA SECURELY AND DECRYPT IT BEFORE SENDING TO THE USER
        // Here, we'll just return it as it is for demonstration purposes
        return this.loginData[service];
    }
}

app.use(fileUpload());
app.use(express.static('public'));

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

app.post('/upload', authenticateToken, async (req, res) => {
    if (!req.files || !req.files.fileInput) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.fileInput;
    
    try {
        // STORE THE FILE ON IPFS (THAT'S THE ONLY DECENTRALIZED STORAGE I KNOW OF)
        const ipfsHash = await storeOnIPFS(uploadedFile);
        
        // SEND TRANSACTION TO THE SMART CONTRACT TO STORE THE IPFS HASH
        const accounts = await web3.eth.getAccounts();
        await contract.methods.storeIdentification(ipfsHash).send({ from: accounts[0] });

        res.send('File uploaded successfully and stored on the blockchain.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while uploading the file.');
    }
});

async function storeOnIPFS(file) {
    // IMPLEMENTATION TO STORE FILE ON IPFS GOES HERE
    // Azi... I'm truly counting on you 😅
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong... and that means you ain\'t getting to this data.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
