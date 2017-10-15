const { loadProtoPath } = require('../../init');

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const protoPath = path.join(__dirname, '..', '..', '..', 'proto', 'Member');

describe('/Member/Authenticate', async () => {

	let rpcAgent = null;
	let rpcClient = null;
	let Member = null;

	before(async () => {
		rpcAgent = global.serviceManager.getContext().get('gRPCClient').getAgent('default');
		rpcClient = rpcAgent.getClient();

		await loadProtoPath(protoPath);

		// Get Service
		Member = rpcClient.getService('Member');
	});

	it('Member do not exist', async () => {

		try {
			// Authenticate
			let ret = await Member.authenticate({
				email: 'test@example.com',
				password: '1234567890'
			});
		} catch(e) {
			assert.ok(e.code === rpcAgent.status.UNAUTHENTICATED);
		}
	});

	it('Failed to authenticate', async () => {

		try {
			// Authenticate
			let ret = await Member.authenticate({
				//email: 'test@example.com',
				email: 'cfsghost@gmail.com',
				password: '1234567890'
			});
		} catch(e) {
			assert.ok(e.code === rpcAgent.status.UNAUTHENTICATED);
		}
	});

	it('OK', async () => {

		// Authenticate
		let ret = await Member.authenticate({
			email: 'cfsghost@gmail.com',
			password: 'iamfred'
		});

		assert.ok(ret.token);
		assert.ok(ret.name);
		assert.ok(ret.email);
	});
});
