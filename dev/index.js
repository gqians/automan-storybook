
const Hapi = require('@hapi/hapi');
const {dealLog,loggerPlugin} =require('@automanh/logger');
const log = dealLog();
process.on('unhandledRejection', (reason, p) => {
	log.error({...reason}, 'Possibly Unhandled Rejection at: \n', p, '\treason:' );
});

const server = async (config = {}) => {
	let server;
	try {
		server = Hapi.server({
			port: config.port,
			host: config.host,
		});
	} catch (error) {
		log.error({...error}, 'Init Hapi server failed\n');
		process.exit(1);
	}
	try {
		await server.register({
			plugin: loggerPlugin,
			options: {}
        });
	} catch (error) {
		log.error({}, 'Register Hapi plugin failed');
		process.exit(1);
	}
	return server;
};
module.exports=server
