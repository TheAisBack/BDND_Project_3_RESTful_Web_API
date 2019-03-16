/*==============	Persist data with LevelDB		====================|
|				Learn more: level: https://github.com/Level/level					|
|================================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair

const addLevelDBData = async (key,value) => {
//		db.put(key, value)
//	};
//function addLevelDBData(key, value) {
	db.put(key, value, function(err) {
		if (err) {
			console.log(key, err);
		}
	})
};

// Get data from levelDB with key
const getLevelDBData = async (key) => db.get(key);

//	Add data to levelDB with value
function addDataToLevelDB(value) {
	let i = 0;
	db.createReadStream().on('data', function(data) {
		i++;
	}).on('error', function(err) {
		return console.log('Unable to read data stream!', err)
	}).on('close', function() {
		console.log('Block #' + i);
		addLevelDBData(i, value);
	});
}

module.exports = {
	addLevelDBData,
	getLevelDBData,
};