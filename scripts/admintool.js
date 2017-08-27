const events = require('events');
const commander = require('commander');
const table = require('borderless-table');

const initializeServices = async () => {

	process.env.NODE_CONFIG_DIR = __dirname + '/../config';
	const config = require('config');
	const { Manager, Context } = require('engined');

	let ctx = new Context();

	try {

		// Loading services
		let services = require('../services');

		// We only pick up services what we need
		let selected = [
			'Storage',
			'LocalStorage',
			'Mailer',
			'GmailMailer',
			'MySQL',
			'Member'
		];

		let selectedServices = selected.reduce((result, serviceName) => {
			result[serviceName] = services[serviceName];
			return result;
		}, {});

		// Initializing engines
		let serviceManager = new Manager(ctx, { verbose: false });
		await serviceManager.loadServices(selectedServices);
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

	let memberAgent = serviceManager.ctx.get('Member').getAgent('default');

	// Find member by email
	let member = await memberAgent
		.getMemberManager()
		.checkMemberByEmail(email);

	// Grant permissions to user
	await memberAgent
		.getPermissionManager()
		.addPermission(member.id, [
			'Admin.access',
			'Member.list'
		])

	console.log(email, 'is administrator now.');

	process.exit();
});

state.on('list_members', async () => {

	let serviceManager = await initializeServices();

	let memberAgent = serviceManager.ctx.get('Member').getAgent('default');

	// Get members
	let members = await memberAgent
		.getMemberManager()
		.listMembers();

	table(members);

	process.exit();
});

commander.version('0.0.1');

commander
	.command('grant [email]')
	.description('Grant administrator permission to a user')
	.action((email) => {
		state.emit('grant', email);
	});

commander
	.command('list member')
	.description('List members')
	.action(() => {
		state.emit('list_members');
	});

commander.parse(process.argv);
