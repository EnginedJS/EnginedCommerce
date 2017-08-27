const config = require('config');
const Service = require('engined-mailer-gmail');

const GmailMailer = Service({
	agentName: 'default',
	type: 'OAuth2',
    user: config.get('mailer').auth.user,
	pass: config.get('mailer').auth.pass,
	clientId: config.get('mailer').auth.clientId,
	clientSecret: config.get('mailer').auth.clientSecret,
	refreshToken: config.get('mailer').auth.refreshToken,
    accessToken: config.get('mailer').auth.accessToken
});

module.exports = GmailMailer;
