# Project 3: RESTful Web API with Node.js Framework

## Getting Started

In this project we are creating a RESTful web API to connect with our blockchain Node.js Framework

### Requirements

- Node.js
- Postman
- Express.js

### Installments

```
git clone https://github.com/TheAisBack/BDND_Project_3_RESTful_Web_API.git
npm init
npm install
npm install crypto-js --save
npm install level --save
npm install express --save
node app.js
```
### GET

The web API contains a GET endpoint that responds to a request using a URL
path with a block height parameter or properly handles an error if the height
parameter is out of bounds.

The response for the endpoint provides a block object in JSON format.

URL:
http://localhost:8000/block/0

Response:
```
{
    "hash":"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3",
    "height":0,
    "body":"First block in the chain - Genesis block",
    "time":"1530311457",
    "previousBlockHash":""
}
```
### POST

The web API contains a POST endpoint that allows posting a new block with
the data payload option to add data to the block body. Block body should
support a string of text.

URL:
http://localhost:8000/block
```
{
    "body": "Testing block with test string data"
}
```
The response for the endpoint is a block object in JSON format.

<p align="center">
    <img src="https://github.com/TheAisBack/BDND_Project_3_RESTful_Web_API/blob/master/Post_image.png">
</p>

open browser and type
http://localhost:8080

## Lesson 03: Utilizing Third-Party Libraries

### Bitcoin-Core
https://www.npmjs.com/package/bitcoin-core

### EthereumJS-Util
https://www.npmjs.com/package/ethereumjs-util

### Query Blockchain
https://www.npmjs.com/search?q=keywords:blockchain

### Bitcoin-Core Example
Example: VerifyMessage RPC function using bitcoin-core Node.js.
