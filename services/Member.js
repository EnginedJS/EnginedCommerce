const config = require('config');
const path = require('path');
const Service = require('engined-member').Service;
const Joi = require('joi');

const Member = Service({
	agentName: 'default',
	dbAgentName: 'default',
	secret: config.get('member.secret')
});

module.exports = Member;
