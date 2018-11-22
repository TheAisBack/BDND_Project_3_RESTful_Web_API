# Project 3: RESTful Web API with Node.js Framework

## Get Project 2

In Project 2: Private Blockchain, you solved the challenge of how to persist our blockchain dataset.
Your next challenge is to build a RESTful API using a Node.js framework that will interfaces with the private blockchain.

By configuring an API for your private blockchain you expose functionality that can be consumed by several types of web clients ranging from desktop, mobile, and IoT devices.
For your next project, you will be creating a RESTful web API for your private blockchain.

The API project will require two endpoints:

- GET block
- POST block

# Project Prerequisites

## Curl
https://curl.haxx.se/book.html

## Postman
https://www.getpostman.com/

## Lesson 1: What's and Why's of APIs
https://classroom.udacity.com/courses/ud388

## Lesson 1: Requests & Responses
https://classroom.udacity.com/courses/ud303

## Lesson 1: What is JavaScript?
https://classroom.udacity.com/courses/ud803

## Lesson 01: Planning a Web Service
https://classroom.udacity.com/nanodegrees/nd1309/parts/c4ecd959-25d3-46c3-91ba-e5d79c638a34/modules/66945d17-26b1-4370-9b8c-466f4fd3e6ff/lessons/35a29f3e-aa24-414d-bf6f-726123ccba68/concepts/236fbd1e-c0a9-4350-866e-bb4c4c2994a0

## Lesson 02: Web Services with Node.js
https://classroom.udacity.com/nanodegrees/nd1309/parts/c4ecd959-25d3-46c3-91ba-e5d79c638a34/modules/66945d17-26b1-4370-9b8c-466f4fd3e6ff/lessons/1389be96-e2e3-4f89-aa6c-7a99092225ea/concepts/26c90f49-1af5-4f6b-b2a3-dc9afa715b08

## esson 03: Utilizing Third-Party Libraries
https://classroom.udacity.com/nanodegrees/nd1309/parts/c4ecd959-25d3-46c3-91ba-e5d79c638a34/modules/66945d17-26b1-4370-9b8c-466f4fd3e6ff/lessons/ad1b5c61-977e-4e9c-a099-f49dc7f221e8/concepts/aa510e3a-94b7-47f8-9720-8028523bdd2c

## Step 1
Select a Node.js framework

## Step 2
COnfigure API service to the appropriate port

## Step 3
Configure two endpoints - GET & POST

## Step 4
Update project README.md



# PROJECT SPECIFICATION


## Setup

### Node.js framework

Project uses one of these 3 Node.js frameworks:

Hapi.js
Express.js
Sails.js

### API Service Port Configuration

The project’s API service is configured to run on port 8000.
The default URL should remain private facing using localhost for connectivity
(example: http://localhost:8000).



## Functionality

### GET Block Endpoint

The web API contains a GET endpoint that responds to a request using a URL path with a block height parameter or properly handles an error if the height parameter is out of bounds.

The response for the endpoint provides a block object in JSON format.

URL: http://localhost:8000/block/0

Response:

{
	"hash"									:		"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3",
	"height"								:		0,
	"body"									:		"First block in the chain - Genesis block",
	"time"									:		"1530311457",
	"previousBlockHash"			:		""
}

### Example POST response
- For URL: http://localhost:8000/block

- HTTP/1.1 200 OK
- content-type: application/json; charset=utf-8
- cache-control: no-cache
- content-length: 238
- Connection: close
{
	"hash"								: 	"ffaffeb2330a12397acc069791323783ef1a1c8aab17ccf2d6788cdab0360b90",
	"height"	 						: 	1,
	"body"				 				: 	"Testing block with test string data",
	"time" 								: 	"1531764891",
	"previousBlockHash"		:		"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}



### POST Block Endpoint

The web API contains a POST endpoint that allows posting a new block with the data payload option to add data to the block body.
Block body should support a string of text.

URL: http://localhost:8000/block

{
	"body": "Testing block with test string data"
}

The response for the endpoint is a block object in JSON format.

### Errors

Service responds with appropriate error responses when posting or getting contents.

A common error to watchout for - When posting to localhost:8000/block without any content on the payload, the service should not create a block.
Be sure to validate if there is content in the block before creating and adding it to the chain.



## Code Readability

### Project README.md

Project contains an updated README.md to include instructions on the deployment of your project.
The README.md must include the Node.js framework for your RESTful API along with its endpoints and options.

Updated README.md must include:

- Node.js framework
- Endpoint documentation


# Project 2: Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```

## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Copy and paste your code into your node session
4: Instantiate blockchain with blockchain variable
```
let blockchain = new Blockchain();
```
5: Generate 10 blocks using a for loop
```
for (var i = 0; i <= 10; i++) {
blockchain.addBlock(new Block("test data "+i));
}
```
6: Validate blockchain
```
blockchain.validateChain();
```
7: Induce errors by changing block data
```
let inducedErrorBlocks = [2,4,7];
for (var i = 0; i < inducedErrorBlocks.length; i++) {
blockchain.chain[inducedErrorBlocks[i]].data='induced chain error';
}
```
8: Validate blockchain. The chain should now fail with blocks 2,4, and 7.
```
blockchain.validateChain();
```