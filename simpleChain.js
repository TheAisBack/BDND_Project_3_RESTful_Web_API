/*========================== SHA256 with Crypto-js ===========================|
|						Learn more: Crypto-js: https://github.com/brix/crypto-js					|
|============================================================================*/

const SHA256 = require('crypto-js/sha256');

/*======================== Persist data with LevelDB =========================|
|							 Learn more: level: https://github.com/Level/level							|
|============================================================================*/

const level = require('./levelSandbox');

/*================================ Block Class ===============================|
|												Class with a constructor for block										|
|============================================================================*/

const blocky = require('./block')

/*============================= Blockchain Class =============================|
|									 Class with a constructor for new blockchain 				 				|
|============================================================================*/

class Blockchain {
	constructor() {
		this.chain = [];
		this.addBlock(new blocky("First block in the chain - Genesis block"));
	}

	//	Add new block
	//	addBlock(newBlock) includes a method to store newBlock within LevelDB
	async addBlock(newBlock) {
		//	Block height
		newBlock.height = this.chain.length;
		//	UTC timestamp
		newBlock.time = new Date().getTime().toString().slice(0,-3);
		//	Previous block hash
		if (this.chain.length>0) {
		  newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
		}
		//	Block hash with SHA256 using newBlock and converting to a string
		newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
		//	Adding block object to chain
		this.chain.push(newBlock);
		await level.addLevelDBData(newBlock.height, JSON.stringify(newBlock));
		return JSON.stringify(newBlock);
	}

	//	Modify getBlockHeight() function to retrieve current block height
	//	within the LevelDB chain
	async getBlockHeight() {
		return level.getLevelDBData('height');
	}

	//	Modify getBlock() function to retrieve a block by its block height
	//	within the LevelDB chain
	async getBlock(blockHeight) {
		return level.getLevelDBData(blockHeight);
	}

	//	Validate block
	//	Modify the validateBlock() function to validate a block stored within
	//	levelDB
	async validateBlock(blockHeight) {
		//	Getting a Promise returned - Help From Udacity Knowledge
		//	get the value of the block object
		let value = await this.getBlock(blockHeight);
		//	Get block hash
		let blockHash = value.hash;
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
	}

	//	Validate blockchain
	//	Modify validateChain() function to validate blockchain stored within
	//	levelDB
	async validateChain() {
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

module.exports = Blockchain