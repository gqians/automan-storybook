#!/usr/bin/env node
const path = require('path')

const program = require('commander')
const shell = require('shelljs')
const { dealLog } = require('@automanh/logger')
const logger = dealLog()

const devServer = require('../src')
const { version } = require('../package.json')

module.paths = [
	path.join(__dirname, '../node_modules'),
	path.join(process.cwd(), 'node_modules'),
	...(process.env.NODE_PATH || 'node_modules').split(':'),
]

program
	.command('serve')
	.alias('server')
	.alias('start')
	.description('start automan-vue dev server')
	.option('-h, --host [host]', 'bind server host', '127.0.0.1')
	.option('--dev-server-port [port]', 'bind dev server port', Number, 8000)
	.option('--inspect', 'inspect mode')
	.action(({ host, devServerPort, inspect }) => {
		process.env.NODE_ENV = 'development'
		shell.mkdir('-p', 'build')
		shell.mkdir('-p', 'src')
		shell.mkdir('-p', 'src/server')

		devServer({
			inspect,
			server: {
				host,
				port: devServerPort,
			}
		})
	})

program
	.command('production')
	.alias('prod')
	.description('start automan-vue in production')
	.option('-h, --host [host]', 'bind server host', '127.0.0.1')
	.option('--dev-server-port [port]', 'bind dev server port', Number, 8000)
	.option('--inspect', 'inspect mode')
	.action(({ host, devServerPort }) => {
		process.env.NODE_ENV = 'production'
		process.env.SERVER_HOST = host
		process.env.SERVER_PORT = devServerPort
		shell.exec(`node ${path.resolve(
			__dirname,
			'../src/startServer.js'
		)}`)
	})

program
	.command('build')
	.description('build plugin')
	.action(async() => {
		process.env.NODE_ENV = process.env.NODE_ENV
			? process.env.NODE_ENV
			: 'production'
		shell.exec('rm -rf dist', (code, stdout, stderr) => {
			if (!stderr) logger.info({ path: 'plugin/index' }, '删除dist目录')
		})
		shell.exec(
			`node ${path.resolve(
				__dirname,
				'../node_modules/.bin/babel'
			)} --config-file ${path.resolve(
				__dirname,
				'../.babelrc.js'
			)} --out-dir ${path.join(process.cwd(), 'dist')} ${path.join(
				process.cwd(),
				'src'
			)}`
		)
	})

program.version(version).parse(process.argv)
