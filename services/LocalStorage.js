const config = require('config');
const path = require('path');
const Service = require('engined-storage-local');

const LocalStorage = Service({
	agentName: 'default',
	storagePath: path.join(process.cwd(), 'public', 'static', 'avatars'),
	externalUrl: config.get('externalUrl') + '/static/avatars'
});

module.exports = LocalStorage;
