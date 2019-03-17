const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./simpleChain');
const Block = require('./block')
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
		return res.status(400).send("Pass data to the block");
	} else {
		let addNewBlock = new Block(req.body.body);
		chain.addBlock(addNewBlock).then(result => {
			return res.status(200).send(result);
		}).catch(err => {
			return res.status(400).send(err);
		});
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));