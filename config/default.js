module.exports = {
	appName: 'EnginedCommerce',
	externalUrl: 'http://localhost:5678',
	server: {
		port: 5678
	},
	mysql: {
	   uri: 'mysql://test:test@localhost/test'
	},
	member: {
		secret: 'HelloBabyEngineCOMMERCe!!'
	},
	mailer: {
		service: 'gmail',
		auth: {
			user: 'example@email.com',
			pass: '123456',
			clientId: '133301827364-o4mkuh7vuksiej28sowik2UDJew7rflj.apps.googleusercontent.com',
			clientSecret: 'O1ByuolT9-EGIDKKDIEJem2N',
			refreshToken: '1/5iwmG1r-R0v_5PK6V0nZ2JG6oZNk7pfkei2IDKEj2usdTmPd18XchOtNfTRZP2kQ',
			accessToken: 'ya29.KifjBMGmwf65sJ_PWRwN3zWIXLGOKFJWU29shu8zUDlKDIJej2srswYRZu73sr3NaLlDNhxptTyXK8mEkLcxRYO5l-P5Dbahy6YdoArb4gD9dikeusj6q5rNAPOXA'
		},
		sender: {
			name: 'service',
			address: 'service@email.com'
		}
	}
};
