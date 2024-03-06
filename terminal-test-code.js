const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class User {
    constructor(name) {
        this.name = name;
        this.personalInformation = {};
        this.bankingData = {};
        this.educationData = {};
        this.moreData = {};
    }

    addPersonalInformation(info) {
        this.personalInformation = info;
    }

    getPersonalInformation() {
        return this.personalInformation;
    }

    addBankingData(data) {
        this.bankingData = data;
    }

    getBankingData() {
        return this.bankingData;
    }

    addEducationData(data) {
        this.educationData = data;
    }

    getEducationData() {
        return this.educationData;
    }

    addMoreData(category, data, subtopic = 'default') {
        if (!this.moreData[category]) {
            this.moreData[category] = {};
        }
        if (!this.moreData[category][subtopic]) {
            this.moreData[category][subtopic] = [];
            this[`get${category.replace(/\s+/g, '')}Data`] = () => {
                return this.moreData[category][subtopic];
            };
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class User {
    constructor(name) {
        this.name = name;
        this.personalInformation = {};
        this.bankingData = {};
        this.educationData = {};
        this.moreData = {};
    }

    addPersonalInformation(info) {
        this.personalInformation = info;
    }

    getPersonalInformation() {
        return this.personalInformation;
    }

    addBankingData(data) {
        this.bankingData = data;
    }

    getBankingData() {
        return this.bankingData;
    }

    addEducationData(data) {
        this.educationData = data;
    }

    getEducationData() {
        return this.educationData;
    }

    addMoreData(category, data, subtopic = 'default') {
        if (!this.moreData[category]) {
            this.moreData[category] = {};
        }
        if (!this.moreData[category][subtopic]) {
            this.moreData[category][subtopic] = [];
            this[`get${category.replace(/\s+/g, '')}Data`] = () => {
                return this.moreData[category][subtopic];
            };
        }
        this.moreData[category][subtopic].push(data);
    }
}

let users = [];

function createSampleUser() {
    rl.question('Enter the name of the user: ', (name) => {
        const newUser = new User(name);
        users.push(newUser);
        console.log(`User "${name}" created successfully.`);
        addData(newUser);
    });
}

function addData(user) {
    rl.question('Enter the category of data you want to add (e.g., personal information, banking data, education data, more data): ', (category) => {
        switch (category.toLowerCase()) {
            case 'personal information':
                rl.question('Enter the personal information: ', (info) => {
                    user.addPersonalInformation(info);
                    saveUserData();
                    rl.close();
                });
                break;
            case 'banking data':
                rl.question('Enter the banking data: ', (data) => {
                    user.addBankingData(data);
                    saveUserData();
                    rl.close();
                });
                break;
            case 'education data':
                rl.question('Enter the education data: ', (data) => {
                    user.addEducationData(data);
                    saveUserData();
                    rl.close();
                });
                break;
            case 'more data':
                rl.question('Enter the category of more data: ', (moreCategory) => {
                    rl.question('Enter the data: ', (data) => {
                        user.addMoreData(moreCategory, data);
                        saveUserData();
                        rl.close();
                    });
                });
                break;
            default:
                console.log('Invalid category.');
                rl.close();
                break;
        }
    });
}

function saveUserData() {
    const jsonData = JSON.stringify(users, null, 2);
    fs.writeFile('users.json', jsonData, (err) => {
        if (err) throw err;
        console.log('User data saved to users.json file.');
    });
}

function startTerminalInterface() {
    console.log('Welcome to the Sample User Creation Terminal Interface!');
    rl.question('Would you like to create a sample user? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            createSampleUser();
        } else {
            console.log('Exiting...');
            rl.close();
        }
    });
}

startTerminalInterface();
￼Enter        }
        this.moreData[category][subtopic].push(data);
    }
}

let users = [];

function createSampleUser() {
    rl.question('Enter the name of the user: ', (name) => {
        const newUser = new User(name);
        users.push(newUser);
        console.log(`User "${name}" created successfully.`);
        addData(newUser);
    });
}

function addData(user) {
    rl.question('Enter the category of data you want to add (e.g., personal information, banking data, education data, more data): ', (category) => {
        switch (category.toLowerCase()) {
            case 'personal information':
                rl.question('Enter the personal information: ', (info) => {
                    user.addPersonalInformation(info);
                    saveUserData();
                    rl.close();
                });
                break;
      case 'banking data':
                rl.question('Enter the banking data: ', (data) => {
                    user.addBankingData(data);
                    saveUserData();
                    rl.close();
                });
                break;
            case 'education data':
                rl.question('Enter the education data: ', (data) => {
                    user.addEducationData(data);
                    saveUserData();
                    rl.close();
                });
                break;
            case 'more data':
                rl.question('Enter the category of more data: ', (moreCategory) => {
                    rl.question('Enter the data: ', (data) => {
                        user.addMoreData(moreCategory, data);
                        saveUserData();
                        rl.close();
                    });
                });
                break;
            default:
                console.log('Invalid category.');
                rl.close();
