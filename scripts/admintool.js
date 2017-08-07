const events = require('events');
const commander = require('commander');

const initializeServices = async () => {

	process.env.NODE_CONFIG_DIR = __dirname + '/../config';
	const config = require('config');
	const { Manager, Context } = require('engined');

	let ctx = new Context();

	try {
		// Initializing engines
		let serviceManager = new Manager(ctx, { verbose: false });
		await serviceManager.loadServices(require('../services'));
		await serviceManager.startAll();

		// Force to stop instance
		process.on('SIGTERM', async () => {
			console.log('Stopping instance');
			await serviceManager.stopAll();
		});

		return serviceManager;
	} catch(e) {
		console.error(e);
	}
};

const state = new events.EventEmitter();

// Grant administrator permission
state.on('grant', async (email) => {
	let serviceManager = await initializeServices();

	let memberAgent = serviceManager.ctx.get('Member')['default'];

	let member = await memberAgent
		.getMemberManager()
		.checkMemberByEmail(email);

	await memberAgent
		.getPermissionManager()
		.addPermission(member.id, [
			'Admin.access',
			'Member.list'
		])
	
	console.log(email, 'is administrator now.');

	process.exit();
});

commander
	.version('0.0.1')
	.command('grant [email]', 'Grant administrator permission to a user')
	.action((email) => {
		state.emit('grant', email);
	})
	.parse(process.argv);
