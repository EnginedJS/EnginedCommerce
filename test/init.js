process.env.NODE_CONFIG_DIR = __dirname + '/../config';

const fs = require('fs');
const path = require('path');
const config = require('config');
const { Manager, Context } = require('engined');

const initServiceManager = async () => {

	let ctx = new Context();

	// Initializing engines
	let serviceManager = new Manager(ctx, { verbose: false });
	await serviceManager.loadServices(require('../services'));

	// gRPC Client agent
	const { Client } = require('engined-grpc');
	await serviceManager.add('gRPC Client', Client({
		protoPath: path.join(__dirname, '..', 'proto', 'Member')
	}));

	await serviceManager.startAll();

	return serviceManager;
};

const uninitServiceManager = async () => {

	await global.serviceManager.stopAll();
}

global.serviceManager = null;

before((done) => {

	console.log('Initializing engined service manager ...');

	// Starting service manager
	initServiceManager()
		.then((_manager) => {

			// Done
			global.serviceManager = _manager;
			done();
		})
		.catch(() => {
			console.log('Failed to start testing');
			process.exit(1);
		});
});

after((done) => {
	uninitServiceManager().then(done);
})

// Common APIs
module.exports = {

	loadProtoPath(protoPath) {

		return new Promise((resolve) => {

			let agent = global.serviceManager.getContext().get('gRPCClient').getAgent('default');

			// Scanning directory
			fs.readdir(protoPath, async (err, files) => {

				for (let index in files) {
					await agent.loadProto(path.join(protoPath, files[index]));
				}

				resolve();
			});
		});
	}
};
