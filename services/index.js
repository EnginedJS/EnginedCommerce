module.exports = {
	Validator: require('engined-validator')(),
	Storage: require('engined-storage')(),
	LocalStorage: require('./LocalStorage'),
	Mailer: require('engined-mailer')(),
	GmailMailer: require('./GmailMailer'),
	MySQL: require('./MySQL'),
	gRPC: require('./gRPC'),
	HTTP: require('./HTTP'),
	Member: require('./Member'),
	MemberAPIProvider: require('./MemberAPIProvider'),
	MemberGRPC: require('./Member-gRPC'),
	LandingPage: require('./LandingPage')
};
