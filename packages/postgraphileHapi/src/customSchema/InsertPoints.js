import { makeExtendSchemaPlugin, gql } from 'graphile-utils'
const MyRegisterUserMutationPlugin = makeExtendSchemaPlugin(build => {
	const { pgSql: sql } = build
	return {
	  typeDefs: gql`
		extend type Mutation {
			createPoints(input: [CreateMeteoTestInput]!): CreateMeteoTestPayload
		}
	  `,
	  resolvers: {
			Mutation: {
		  		createPoints: async(_query, args, context, resolveInfo) => {
					const { pgClient } = context
					// Start a sub-transaction
					await pgClient.query('SAVEPOINT graphql_mutation')
					// const geometry = wkx.Geometry.parseGeoJSON(args.input[0].meteoTest.geom)
					try {
						// Our custom logic to register the user:
						const resultRow = []
						args.input.forEach(async(input) => {
							const result = await pgClient.query(
								`INSERT INTO point_meteo.meteo_test(id, geom) VALUES ($1, ST_GeomFromGeoJSON($2))RETURNING *`,
								[input.meteoTest.id, JSON.stringify(input.meteoTest.geom)]
							  )
							resultRow.push(result)
						})
						// const { rows: [user] } = result
						const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
							sql.fragment`point_meteo.meteo_test`,
							(tableAlias, queryBuilder) => {
								console.log(queryBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value('123')} or ${tableAlias}.id = ${sql.value('1314')}`
								))
								queryBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value('123')} or ${tableAlias}.id = ${sql.value('1314')}`
								  )
							}
						)
						console.log(resultRow)
						console.log(sql.fragment`point_meteo.meteo_test`)
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
export { MyRegisterUserMutationPlugin }
