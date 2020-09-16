import PostgisPlugin from '@graphile/postgis'
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector'
import ConnectionFilterPostgisPlugin from 'postgraphile-plugin-connection-filter-postgis'
import { MyRegisterUserMutationPlugin } from './src/customSchema'
const graphqlPluginConfig = {
	DATABASE_USER: 'qianh',
	DATABASE_PASSWORD: '123456',
	DATABASE_ADDRESS: '0.0.0.0',
	DATABASE_PORT: '5432',
	DATABASE_SCHEMA: 'point_meteo',
	graphql: {
		PORT: 3000,
		ADDRESS: '0.0.0.0',
		commonOptions: {
			subscriptions: true,
			dynamicJson: true,
			setofFunctionsContainNulls: false,
			ignoreRBAC: false,
			enableQueryBatching: true,
  			legacyRelations: 'omit',
			  // ignoreIndexes: false,
			appendPlugins: [
				PgSimplifyInflectorPlugin,
				PostgisPlugin.default || PostgisPlugin,
				ConnectionFilterPlugin,
				ConnectionFilterPostgisPlugin,
				MyRegisterUserMutationPlugin
			],
			pgSettings(req) {
				/* TODO */
			},
		},
		developmentOptions: {
			watchPg: true,
			showErrorStack: 'json',
			extendedErrors: ['hint', 'detail', 'errcode'],
			exportGqlSchemaPath: 'schema.graphql',
			graphiql: true,
			enhanceGraphiql: true,
			allowExplain(req) {
				// TODO: customise condition!
				return true
			},
		},
		productionOptions: {
			retryOnInitFail: true,
			extendedErrors: ['errcode'],
			graphiql: false,
			disableQueryLog: true
		}
	}
}
export { graphqlPluginConfig }
