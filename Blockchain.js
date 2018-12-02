/*==========================	SHA256 with Crypto-js	============================|
|						Learn more:	Crypto-js:	https://github.com/brix/crypto-js						|
|==============================================================================*/
const SHA256 = require('crypto-js/sha256');
/*========================	Persist data with LevelDB	==========================|
|								Learn more: level: https://github.com/Level/level								|
|==============================================================================*/
const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);
/*==============================	Functions	====================================|
|															List of Functions																	|
|==============================================================================*/
//	Add data to levelDB with key/value pair
function addLevelDBData(key, value) {
	db.put(key, JSON.stringify(value), function(err) {
		if (err) return console.log('Block ' + key + ' submission failed', err);
	});
}
//	Get data from levelDB with key
function getLevelDBData(key) {
	return new Promise((resolve, reject) => {
		db.get(key, function(err, value) {
			if (err) {
				console.log("Not found!", err);
				reject(err);
			} else {
				resolve(value);
			}
		});
	});
}
/*==============================	Block Class	==================================|
|											Class with a constructor for Block												|
|==============================================================================*/
class Block {
	constructor(data){
		this.hash		=	"",
		this.height	=	0,
		this.body		=	data,
		this.time		= 0,
		this.previousHash = ""
	}
}
/*=============================	Blockchain Class	==============================|
|										Class with a constructor for new blockchain									|
|==============================================================================*/
class Blockchain {
	constructor() {
		let height = this.getBlockHeight();
		//	Created an if statement to find out if there is a genesis block. 
		if (height < 0) {
			this.addBlock(new Block("First block in the chain - Genesis block"));
		}
	}
	//	Add new block
	//	addBlock(newBlock) includes a method to store newBlock within LevelDB
	addBlock(newBlock) {
		//	Establishing height
		let height = this.getBlockHeight();
		//	Previous block hash
		if(height >= 0) {
			newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
			//	Block height - New method - Udacity Knowledge
			//	newBlock.height = this.chain.length;
			newBlock.height = previousBlockHeight +1;
		}
		//	UTC timestamp
		newBlock.time = new Date().getTime().toString().slice(0,-3);
		//	Block hash with SHA256 using newBlock and converting to a string
		newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
		//	Adding block object to chain
		//	this.chain.push(value);
		//	Add the newblock to the function addDataToLevelDB, new way to get height		
		this.addLevelDBData(newBlock.height, newBlock);
	}
	//	New method to add information to LevelDB.
	addLevelDBData(height, newBlock) {
		db.put(height, JSON.stringify(newBlock), function(err) {
			if (err) return console.log('Block ' + newBlock.height + ' submission failed', err);
		});
	}
	//	Modify getBlockHeight() function to retrieve current block height within the LevelDB chain
	getBlockHeight() {
		let i = 0;
		db.createReadStream().on('data', function(data) {
			i++;
		}).on('error', function(err) {
			return console.log('Unable to find current height', err)
		}).on('close', function() {
			console.log('Found Height' + i);
			return i -1;
		});
	}
	//	Modify getBlock() function to retrieve a block by its block height within the LevelDB chain
	getBlock(blockHeight) {
		getLevelDBData(blockHeight)
		.then(value => console.log(JSON.parse(value)))
		.catch(err => console.log(err));
	}

	//	Validate block
	//	Modify the validateBlock() function to validate a block stored within levelDB
	validateBlock(blockHeight) {
		//	Getting a Promise returned - Help From Udacity Knowledge
		return new Promise(function (resolve, reject) {
			//	Adding to levelDB
			db.get('newadd' + blockHeight, function(err, value) {
				//	Get block hash
				let blockHash = JSON.parse(value).hash;
				//	Remove block hash to test block integrity
				value.hash = '';
				//	Generate block hash
				let validBlockHash = SHA256(JSON.stringify(value)).toString();
				//	Compare
				if (blockHash===validBlockHash) {
					return true;
				} else {
					console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
					return false;
				}
			})
		})
	}

	//	Validate blockchain
	//	Modify validateChain() function to validate blockchain stored within levelDB
	validateChain() {
		let errorLog = [];
		for (var i = 0; i < this.chain.length-1; i++) {
			//	Validate block
			if (!this.validateBlock(i))errorLog.push(i);
			//	Compare blocks hash link
			let blockHash = this.chain[i].hash;
			let previousHash = this.chain[i+1].previousBlockHash;
			if (blockHash!==previousHash) {
				errorLog.push(i);
			}
		}
		if (errorLog.length>0) {
			console.log('Block errors = ' + errorLog.length);
			console.log('Blocks: '+errorLog);
		} else {
			console.log('No errors detected');
		}
	}
}

const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//	Get block endpoint
app.get('/block/:blockheight', (req, res) => {
	let blockchain = new simpleChain.Blockchain();
	let blockheight = req.params.blockheight
	//	console.log("Blockheight requested is", blockheight)
	blockchain.getBlock(blockheight)
		.then(block => {
			res.send(block)
		}, err => {
			res.send({
				status: 'error',
				message: 'block not found'
			})
		})
})
//	Post block endpoint
app.post('/block', (req, res) => {
	let blockchain = new simpleChain.Blockchain();
	let blockData = req.body
	//	console.log(blockData)
	if(blockData.body.length > 0) {
		//	console.log("block data is", blockData)
		let newBlock = new simpleChain.Block(blockData.body)
		blockchain.addBlock(newBlock)
			.then(block => {
				res.send(block)
			}, err => {
				res.send({
					status: 'error',
					message: err
				})
			})
		} else {
			res.send({
				status: 'error',
				message: 'block data is missing'
			})
		}
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))