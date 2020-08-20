const path = require('path');
module.exports = ({ config, mode }) => {

	config.module.rules.push({
	test: /\.css$/,
	loaders: [
		{
		loader: 'postcss-loader',
		options: {
			sourceMap: true,
			config: {
			path: './.storybook/',
			},
		},
		},
	],

	include: path.resolve(__dirname, '../storybook/components/'),
	},
	{
		test: /\.stories\.js?$/,
		loaders: [require.resolve('@storybook/source-loader')],
		include: [path.resolve(__dirname, '../storybook/stories')],
		enforce: 'pre',
	},
	);

  return config;
};
