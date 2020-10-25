
const Hapi = require('@hapi/hapi');
const {dealLog,loggerPlugin} =require('@automanh/logger');
const graphqlPlugin = require('../packages/postgraphileHapi')
const graphqlPluginConfig = require('../packages/postgraphileHapi/config')
const {InsertPointsMutationPlugin,customSchemaConfig} = require('../packages/postgraphileHapi/src/customSchema')
const InsertPointPlugin = InsertPointsMutationPlugin(customSchemaConfig.InsertPoint)
graphqlPluginConfig.graphql.commonOptions.appendPlugins.push(InsertPointPlugin)
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
		await server.register([{
			plugin: loggerPlugin,
			options: {}
        },{
			plugin: graphqlPlugin,
			options:graphqlPluginConfig
		}]);
	} catch (error) {
		log.error({error}, 'Register Hapi plugin failed');
		process.exit(1);
	}
	return server;
};
module.exports=server
