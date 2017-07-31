const Service = require('engined-member').APIProvider;

const MemberApiProvider = Service({
	memberAgent: 'default'
});

module.exports = MemberApiProvider;
