const customSchemaConfig = {
	InsertPoint: {
		schema: 'point_meteo',
		table: 'station',
		typeString: `
		input CreateStationsInput{
			station: [StationInput]!
			clientMutationId: String
		}
		`,
		mutationString: `
		InsertPoints(input: CreateStationsInput!): CreateStationPayload
		`,
		attribute: 'geom',
		dealArgs: (args) => { return args.input.station.map((arg) => { return arg }) },
		queryString: `INSERT INTO point_meteo.station(geom)
		SELECT ST_GeomFromGeoJSON(geom) FROM jsonb_to_recordset($1) AS t (geom text) RETURNING *`
	}
}
export { customSchemaConfig }
