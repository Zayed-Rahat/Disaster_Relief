// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisasterRelief {
    // Government Task 
//     1. Monitor: Government agencies can track relief operations and resources in real-time.
// 2. Allocate Fund: They have the ability to transparently allocate funds for disaster relief.
// 3. Receive Information about Affected Area: Access critical data about affected areas swiftly and
// accurately

     struct Operation{
        uint id;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        bool completed;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Operation) public operations;
    uint256 public numberOfOperations = 0;


    // Function for government to add new operation
    function addOperation(address _owner, string memory _title, string memory _description, uint256 _target, string memory _image) public returns (uint256){

        Operation storage operation = operations[numberOfOperations];

        operation.id = numberOfOperations;
        operation.owner = _owner;
        operation.title = _title;
        operation.description = _description;
        operation.target = _target;
        operation.amountCollected = 0;
        operation.image = _image;
        operation.completed = false;

        numberOfOperations++;

        return numberOfOperations - 1;
    }    

    function getAllOperations() public view returns (Operation[] memory) {
        Operation[] memory allOperations = new Operation[](numberOfOperations);

        for(uint i = 0; i < numberOfOperations; i++) {
            Operation storage item = operations[i];

            allOperations[i] = item;
        }

        return allOperations;
    }

     function completeOperation(uint _operationId) public {
        Operation storage operation = operations[_operationId];
        require(!operation.completed, "Operation has already been marked as complete");
        operation.completed = true;
    }



// for donators 

//     1. Register: Register securely on the blockchain platform to participate in relief efforts.
// 2. Make Donations: Contribute funds and resources efficiently to support disaster relief.


 function donateToOperation(uint256 _id) public payable {
        uint256 amount = msg.value;
    require(amount> 0, "Quantity must be greater than zero");

        Operation storage operation = operations[_id];

        operation.donators.push(msg.sender);
        operation.donations.push(amount);

        (bool sent,) = payable(operation.owner).call{value: amount}("");

        if(sent) {
            operation.amountCollected = operation.amountCollected + amount;
        }
    }

function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (operations[_id].donators, operations[_id].donations);
    }


//Victims:
// 1. Request for Relief: Submit relief requests through the blockchain system to receive assistance
// swiftly and transparently

  struct Request {
        uint id;
        address victim;
        string description;
        bool resolved;
    }

    Request[] public requests;

    // Function for victims to submit relief requests
    function submitRequest(string memory _description) public {
        requests.push(Request({
            id: requests.length,
            victim: msg.sender,
            description: _description,
            resolved: false
        }));
    }

    // Function for victims to check the status of their requests
    function checkRequestStatus(uint _requestId) public view returns (bool) {
        return requests[_requestId].resolved;
    }

}