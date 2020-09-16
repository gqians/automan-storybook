import { postgraphile } from 'postgraphile'
import http from 'http'
const graphqlPlugin = {
	name: 'postgraph',
	version: '1.0.0',
	dependencies: {
		logger: '1.0.0',
	},
	register: async function(server, options) {
		process.env.NODE_ENV = process.env.NODE_ENV || 'production'
		const commonOptions = options.graphql.commonOptions
		const developmentOptions = options.graphql.developmentOptions
		const productionOptions = options.graphql.productionOptions
		const postgraphileOptions = Object.assign(commonOptions, process.env.NODE_ENV === 'production' ? productionOptions : developmentOptions)
		http
			.createServer(
				postgraphile(
					`postgres://${options.DATABASE_USER}:${options.DATABASE_PASSWORD}@${options.DATABASE_ADDRESS}:${options.DATABASE_PORT}/postgres`,
					options.DATABASE_SCHEMA,
					postgraphileOptions
				)
			)
			.listen(options.graphql.PORT, options.graphql.ADDRESS)
		server.log.debug({ path: 'src/index.js' }, `插件postgraphile-hapi启动\ngraphiql: http://${options.graphql.ADDRESS}:${options.graphql.PORT}/graphiql`)
		server.log.info({}, `graphql is proxied in service http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/graphql`)
		await server.register(require('@hapi/h2o2'))
		server.route({
			method: 'GET',
			path: '/graphql/stream',
			handler: {
				proxy: {
					uri: `http://${options.graphql.ADDRESS}:${options.graphql.PORT}/graphql/stream`,
					passThrough: true
				}
			}
		})
		server.route({
			method: 'POST',
			path: '/graphql',
			handler: {
				proxy: {
					uri: 'http://${options.graphql.ADDRESS}:${options.graphql.PORT}/graphql',
					passThrough: true
				}
			}
		})
	},
}

export { graphqlPlugin }

