module.exports.remote = {
	server: process.env.DB_SERVER || 'ash-demo.imednet.com',
	port:process.env.DB_PORT || '27017',
	database:process.env.DB_NAME || 'webservices'
};

module.exports.local = {
	server: process.env.DB_SERVER || 'localhost',
	port:process.env.DB_PORT || '27017',
	database:process.env.DB_NAME || 'sandbox'
};

module.exports.env = 'local';