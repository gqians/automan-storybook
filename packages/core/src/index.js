const kill = require('tree-kill')
const { dealLog } = require('@automanh/logger')
const nodemon = require('nodemon')
const path = require('path')

module.exports = async config => {
	const logger = dealLog()
	console.log(path.resolve(__dirname, '../../'))
	// start server
	nodemon({
		script: path.join(__dirname, 'startServer.js'),
		watch: [
			path.join(process.cwd(), 'src/server'),
			path.join(process.cwd(), 'dev'),
			path.join(process.cwd(), 'src/config.js'),
			path.resolve(__dirname, '../../')
		],
		execMap: {
			js: 'node -r esm',
		},
		env: {
			...process.env,
			SERVER_HOST: config.server.host,
			SERVER_PORT: config.server.port - '',
			NODE_ENV: 'development',
			...(config.inspect
				? { NODE_OPTIONS: '--inspect=127.0.0.1:9222' }
				: {}),
		},
	})
	// kill server on press "ctrl + c"
	const sign = ['SIGINT', 'SIGTERM']
	sign.forEach(sig =>
		process.on(sig, function() {
			logger.info({}, `Stop server ${sig}`)
			try {
				kill(process.pid, 'SIGKILL')
			} catch (error) {
				logger.error({ ...error }, 'Stop server failed')
				process.exit(1)
			}
		})
	)
}
