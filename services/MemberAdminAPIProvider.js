const Service = require('engined-member').AdminAPIProvider;

const MemberAdminApiProvider = Service({
	memberAgent: 'default'
});

module.exports = MemberAdminApiProvider;
