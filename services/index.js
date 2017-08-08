module.exports = {
	Validator: require('engined-validator')(),
	Storage: require('engined-storage')(),
	LocalStorage: require('./LocalStorage'),
	Mailer: require('engined-mailer')(),
	LocalMailer: require('./LocalMailer'),
	MySQL: require('./MySQL'),
	HTTP: require('./HTTP'),
	Member: require('./Member'),
	MemberAPIProvider: require('./MemberAPIProvider'),
	MemberAdminAPIProvider: require('./MemberAdminAPIProvider'),
	LandingPage: require('./LandingPage')
};
