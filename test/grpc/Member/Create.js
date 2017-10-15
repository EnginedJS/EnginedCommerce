const { loadProtoPath } = require('../../init');

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const protoPath = path.join(__dirname, '..', '..', '..', 'proto', 'Member');

describe('/Member/Create', async () => {

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

	it('OK', async () => {

		// Authenticate
		let ret = await Member.create({
			name: 'Test Account',
			email: 'test@example.com',
			password: '1234567890'
		});

		assert.ok(ret.token);
		assert.ok(ret.email);
		assert.ok(ret.name);
	});

	it('Member exists already', async () => {

		try {
			// Authenticate
			let ret = await Member.create({
				name: 'Test Account',
				email: 'test@example.com',
				password: '1234567890'
			});
		} catch(e) {
			assert.ok(e.code === rpcAgent.status.ALREADY_EXISTS);
		}
	});
});
