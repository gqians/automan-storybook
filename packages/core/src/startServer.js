const path = require('path')
const { dealLog } = require('@automanh/logger')
const server = require(path.join(process.cwd(), 'dev/index.js'))
const logger = dealLog()
logger.info({ path: 'core/src/startServer' }, '服务器开启')
const init = async() => {
	// require()
	// 	.default({
	// 		host: process.env.SERVER_HOST,
	// 		port: process.env.SERVER_PORT,
	// 	})
	server({
		host: process.env.SERVER_HOST,
		port: process.env.SERVER_PORT,
	})
		.then(server => {
			return server
				.start()
				.then(() =>
					logger.info(
						{ path: 'core/src/startServer' },
						`Server started. API: ${server.info.uri}`
					)
				)
		})
		.catch(err => {
			logger.error(
				{ path: 'core/src/startServer', err },
				'Start server failed'
			)
		})
}
process.on('unhandledRejection', err => {
	logger.error({ path: 'core/src/startServer', err }, '服务器运行出错')
	process.exitCode = 1
})

init()
