module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: {
					node: true
				},
			},
		],
	],
	plugins: [
		[
			'@babel/plugin-proposal-decorators',
			{ decoratorsBeforeExport: false },
		],
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-export-namespace-from',
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true,
			},
		],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-numeric-separator',
		'@babel/plugin-proposal-throw-expressions',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator',
		[
			'babel-plugin-module-resolver',
			{
				root: ['./src/'],
				alias: {
					'package.json': './package.json',
				},
			},
		],
	],
	env: {
		test: {
			plugins: [
				[
					'@babel/plugin-transform-modules-commonjs',
					{
						loose: false,
					},
				],
			],
		},
	},
};
