import { makeExtendSchemaPlugin, gql } from 'graphile-utils'
const InsertPointsMutationPlugin = (config) => {
	return makeExtendSchemaPlugin(build => {
		const { pgSql: sql } = build
		return {
			typeDefs: gql`
				${config.typeString}
				extend type Mutation {
					${config.mutationString}
				}
			`,
	  		resolvers: {
				Mutation: {
					InsertPoints: async(_query, args, context, resolveInfo) => {
						const { pgClient } = context
						await pgClient.query('SAVEPOINT graphql_mutation')
						try {
							const argsInput = config.dealArgs(args)
							await pgClient.query(config.queryString, [JSON.stringify(argsInput)])
							const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
								sql.fragment`${sql.identifier(config.schema)}.${sql.identifier(config.table)}`,
								async(tableAlias, queryBuilder) => {
									await queryBuilder.where(sql.fragment`ST_Equals(${tableAlias}.${sql.identifier(config.attribute)}, ST_GeomFromGeoJSON(${sql.value(JSON.stringify(argsInput[0][config.attribute]))}))`
									)
								}
							)
							return { data: row, query: build.$$isQuery }
						} catch (e) {
							await pgClient.query('ROLLBACK TO SAVEPOINT graphql_mutation')
							throw e
						} finally {
							await pgClient.query('RELEASE SAVEPOINT graphql_mutation')
						}
		 			},
				},
			},
		}
	})
}
export { InsertPointsMutationPlugin }
