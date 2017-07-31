const config = require('config');
const path = require('path');
const Service = require('engined-mysql');

const MySQL = Service({
	uri: config.get('mysql.uri')
});

module.exports = MySQL;
