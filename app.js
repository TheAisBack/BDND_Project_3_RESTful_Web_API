const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./simpleChain');
const Blocky = require('./block')
const app = express();
const chain = new Blockchain();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//	Get block endpoint
app.get('/block/:height', async (req, res) => {
	try {
		const { height } = req.params;
		const block = await chain.getBlock(height);
		console.log(block);
		return res.send(JSON.parse(block))
	} catch(error) {
		res.status(404).json({
			"message": "Error no block found"
		})
	}
});

app.post("/block", (req, res) => {
	if (req.body.body === "" || req.body.body === undefined) {
		res.status(400).send("Pass data to the block");
	} else {
		let addNewBlock = new Block.Block(req.body.body);
		myBlockChain.addBlock(addNewBlock).then(result => {
			res.status(200).send(result);
		}).catch(err => {
			res.status(400).send(err);
		});
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));