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
	const { height } = req.params;
	const block = await chain.getBlock(height);
	console.log(block);
	return res.json(block);
});

app.post('/block', async (req, res) => {
	const block = new Blocky(req.body);
	await chain.addBlock(block);
	return res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));