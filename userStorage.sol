// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserStorage {
    struct UserData {
        string name;
        mapping(string => string[]) personalInformation;
        mapping(string => string[]) bankingData;
        mapping(string => string[]) educationData;
        mapping(string => string[]) moreData;
    }

    mapping(string => UserData) users;
    mapping(address => string) userAddresses;

    function createUser(string memory name) public {
        require(bytes(userAddresses[msg.sender]).length == 0, "User already exists");

        users[name].name = name;
        userAddresses[msg.sender] = name;
    }

    function addPersonalInformation(string memory category, string memory data) public {
        string storage userName = userAddresses[msg.sender];
        users[userName].personalInformation[category].push(data);
    }

    function addBankingData(string memory category, string memory data) public {
        string storage userName = userAddresses[msg.sender];
        users[userName].bankingData[category].push(data);
    }

    function addEducationData(string memory category, string memory data) public {
        string storage userName = userAddresses[msg.sender];
        users[userName].educationData[category].push(data);
    }

    function addMoreData(string memory category, string memory data) public {
        string storage userName = userAddresses[msg.sender];
        users[userName].moreData[category].push(data);
    }

    function getPersonalInformation(string memory category) public view returns (string[] memory) {
        string storage userName = userAddresses[msg.sender];
        return users[userName].personalInformation[category];
    }

    function getBankingData(string memory category) public view returns (string[] memory) {
        string storage userName = userAddresses[msg.sender];
        return users[userName].bankingData[category];
    }

    function getEducationData(string memory category) public view returns (string[] memory) {
        string storage userName = userAddresses[msg.sender];
        return users[userName].educationData[category];
    }

    function getMoreData(string memory category) public view returns (string[] memory) {
        string storage userName = userAddresses[msg.sender];
        return users[userName].moreData[category];
    }
}
